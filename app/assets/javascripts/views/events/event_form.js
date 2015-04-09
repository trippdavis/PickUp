CleatUp.Views.EventForm = Backbone.View.extend({
  initialize: function (options) {
    if (options.group_id) {
      this.group_id = options.group_id;
    } else {
      this.group_id = null;
    }
    this.formType = options.formType;
    this.listenTo(this.model, "sync", this.setupFill);
  },

  template: JST["events/form"],

  events: {
    "submit .event-form": "submit",
    "click .back-to-index": "toIndex",
    "click .back-to-show": "toShow"
  },

  render: function () {
    var content = this.template({
      event: this.model,
      group_id: this.group_id
    });
    this.$el.html(content);
    this.formSpecific();
    return this;
  },

  formSpecific: function () {
    if (this.formType === "New") {
      this.$el.prepend("<h3>New Event</h3>");
      this.$el.append("<button class='back-to-index'>Back</button>");
    } else {
      this.$el.prepend("<h3>Edit Event</h3>");
      this.$el.append("<button class='back-to-show'>Back</button>");
    }
  },

  submit: function (event) {
    event.preventDefault();

    var data = $(event.currentTarget).serializeJSON();
    this.model.set(data);
    this.model.save({}, {
      success: function () {
        Backbone.history.navigate("#/events/" + this.model.id, { trigger: true });
      }.bind(this),
      error: function (model, response) {
        if (response.status === 500) {
          Backbone.history.navigate("#/events/" + model.id, { trigger: true });
        } else {
          this.handleError(model, response);
        }
      }.bind(this)
    });
  },

  toShow: function (event) {
    event.preventDefault();
    Backbone.history.navigate("#/events/" + this.model.id, { trigger: true });
  },

  toIndex: function (event) {
    event.preventDefault();
    Backbone.history.navigate("", { trigger: true });
  },

  handleError: function (model, response) {
    this.showErrors(response.responseJSON.errors);

    this.fillForm(
      model.attributes.event.title,
      model.attributes.event.location,
      model.attributes.event.description,
      model.attributes.event.date,
      model.attributes.event.time
    );
  },

  showErrors: function (errors) {
    var $ul = this.$el.find("ul.errors");
    $ul.empty();
    errors.forEach( function (err) {
      $ul.append("<li>" + err + "</li>");
    });
  },

  setupFill: function () {
    if (this.formType == "Edit") {
      this.fillForm(
        this.model.get("title"),
        this.model.get("location"),
        this.model.get("description"),
        this.model.date,
        this.model.time
      );
    }
  },

  fillForm: function (title, location, description, date , time) {
    this.$el.find(".event-title").val(title);
    this.$el.find(".event-location").val(location);
    this.$el.find(".event-description").val(description);
    this.$el.find(".event-date").val(date);
    this.$el.find(".event-time").val(time);
  }
});