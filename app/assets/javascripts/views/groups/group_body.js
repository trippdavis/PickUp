CleatUp.Views.GroupBody = Backbone.View.extend({
  initialize: function (options) {
    this.type = options.type;
    this.event_id = options.event_id;
    this.currentEvent = this.collection.getOrFetch(this.event_id);
  },

  className: "group-body",

  events: {
    "click .delete-event": "destroy",
    "click .back-to-index": "backHome",
    "click .group-event": "clickEvent",
    "click .edit-event": "clickEdit",
    "click .back-to-show": "showEvent"
  },

  render: function () {
    if (this.type === "group") {
      this.groupHome();
    } else if (this.type === "event") {
      this.showEvent();
    } else if (this.type === "event-edit") {
      this.editEvent();
    } else if (this.type === "event-new") {
      this.newEvent();
    }

    return this;
  },

  clickEdit: function () {
    Backbone.history.navigate("groups/" + this.model.id + "/events/" + this.event_id + "/edit");
    editEvent();
  },

  editEvent: function () {
    // var event = this.collection.getOrFetch(this.event_id);
    var view = new CleatUp.Views.EventForm({
      model: this.currentEvent,
      group_id: this.model.id,
      formType: "Edit"
    });
    this._swapBody(view);
  },

  newEvent: function () {
    // var event = new CleatUp.Models.Event();
    // event.fetch();
    this.currenEvent = new CleatUp.Models.Event();
    this.currentEvent.fetch();
    var view = new CleatUp.Views.EventForm({
      model: this.currentEvent,
      group_id: this.model.id,
      formType: "New"
    });
    this._swapBody(view);
  },

  backHome: function () {
    Backbone.history.navigate("groups/" + this.model.id);
    this.groupHome();
  },

  groupHome: function () {
    this.collection.fetch({
      data: {
        type: "group",
        group_id: this.model.id
      }
    });
    var view = new CleatUp.Views.GroupEvents({
      model: this.model,
      collection: this.collection
    });
    this._swapBody(view);
  },

  clickEvent: function (event) {
    var event_id = $(event.currentTarget).data("event-id");
    this.currentEvent = this.collection.getOrFetch(event_id);
    Backbone.history.navigate("groups/" + this.model.id + "/events/" + event_id);
    this.showEvent();
  },

  showEvent: function () {
    var view = new CleatUp.Views.EventShow({
      model: this.currentEvent
    });
    this._swapBody(view);
  },

  destroy: function (event) {
    debugger

    this.model.destroy({
      success: function () {
        Backbone.history.navigate("groups/" + this.model.get("group_id"), { trigger: true });
      }.bind(this)
    });
  },

  _swapBody: function (view) {
    if (this.currentBody) {
      this.currentBody.remove();
    }

    this.$el.html(view.render().$el);
    this.currentBody = view;
  }
});
