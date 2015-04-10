CleatUp.Views.InterestsIndex = Backbone.View.extend({
  initialize: function (options) {
    this.listenTo(this.collection, "sync", this.render);
    this.listenTo(this.collection, "sync", this.preselectInterests);
  },

  events: {
    "click .interest": "handleClick",
    "click .submit": "submitInterests"
  },

  template: JST['interests/index'],

  render: function () {
    var content = this.template({ interests: this.collection });
    this.$el.html(content);
    return this;
  },

  preselectInterests: function () {
    this.prevInterests = [];
    this.collection.where({ user_interest: true }).forEach(function (interest) {
      this.prevInterests.push(interest.id);
      $('button[data-id="' + interest.id + '"]').toggleClass("btn-default btn-success");
    }.bind(this));
  },

  handleClick: function (event) {
    $button = $(event.target);
    $button.toggleClass("btn-default btn-success");
  },

  submitInterests: function () {
    buttons = $(".btn-success");
    buttons.each(function (i, button) {
      var interest_id = $(button).data("id");
      $.ajax({
        url: "/interestings",
        type: "POST",
        data: {
          interest_id: interest_id,
          type: "User"
        }
      });
    });
    Backbone.history.navigate("", { trigger: true });
  }
});