(function ($) {
	/* "YYYY-MM[-DD]" => Date */
	function strToDate(str) {
		try {
			var array = str.split('-');
			var year = parseInt(array[0]);
			var month = parseInt(array[1]);
			var day = array.length > 2? parseInt(array[2]): 1 ;
			if (year > 0 && month >= 0) {
				return new Date(year, month - 1, day);
			} else {
				return null;
			}
		} catch (err) {}; // just throw any illegal format
	};

	/* Date => "YYYY-MM-DD" */
	function dateToStr(d) {
		/* fix month zero base */
		var year = d.getFullYear();
		var month = d.getMonth();
		return year + "-" + (month + 1) + "-" + d.getDate();
	};

	$.fn.calendar = function (options) {
		var _this = this;
		var opts = $.extend({}, $.fn.calendar.defaults, options);
		var week = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		var tHead = week.map(function (day) {
			return "<th>" + day + "</th>";
		}).join("");

		_this.init = function () {
			var tpl = '<table class="cal">' +
			'<caption>' +
			'	<span class="prev"><a href="javascript:void(0);">&larr;</a></span>' +
			'	<span class="next"><a href="javascript:void(0);">&rarr;</a></span>' +
			'	<span class="month"><span>' +
			"</caption>" +
			"<thead><tr>" +
			tHead +
			"</tr></thead>" +
			"<tbody>" +
			"</tbody>" + "</table>";
			var html = $(tpl);
			_this.append(html);
		};

		function daysInMonth(d) {
			var newDate = new Date(d);
			newDate.setMonth(newDate.getMonth() + 1);
			newDate.setDate(0);
			return newDate.getDate();
		}

		_this.update = function (date) {
			var mDate = new Date(date);
			mDate.setDate(1); /* start of the month */
			var day = mDate.getDay(); /* value 0~6: 0 -- Sunday, 6 -- Saturday */
			mDate.setDate(mDate.getDate() - day) /* now mDate is the start day of the table */

			function dateToTag(d) {
				var tag = $('<td><a href="javascript:void(0);"></a></td>');
				var a = tag.find('a');
				a.text(d.getDate());
				a.data('date', dateToStr(d));
				if (date.getMonth() != d.getMonth()) { // the bounday month
					tag.addClass('off');
				} else {
					tag.addClass('date-square');
				}


				if (_this.data('date') == a.data('date')) { // the select day
					tag.addClass('active');
					_this.data('date', dateToStr(d));
				}
				return tag;
			};

			var tBody = _this.find('tbody');
			tBody.empty(); /* clear previous first */
			var cols = Math.ceil((day + daysInMonth(date))/7);
			for (var i = 0; i < cols; i++) {
				var tr = $('<tr></tr>');
				for (var j = 0; j < 7; j++, mDate.setDate(mDate.getDate() + 1)) {
					tr.append(dateToTag(mDate));
				}
				tBody.append(tr);
			}

			var year = date.getFullYear();
			var month = months[date.getMonth()];
			var monthStr = month + " " + year;
			_this.find('.month').text(monthStr);
		};

		_this.getCurrentDate = function () {
			return _this.data('date');
		};

		_this.init();
		var initDate = opts.date? opts.date: new Date();
		if (opts.date || !opts.picker) {
			_this.data('date', dateToStr(initDate));
		}
		_this.update(initDate);

		/* event binding */
		_this.delegate('tbody td.date-square', 'click', function () {
			var $this = $(this);
			_this.find('.active').removeClass('active');
			$this.addClass('active');
			_this.data('date', $this.find('a').data('date'));
			if (opts.picker) {  /* in picker mode, when date selected, panel hide */
				_this.hide();
			}
		});

		function updateTable(monthOffset) {
			var monthStr = _this.find('.month').text().split(" ");
			var date = strToDate(monthStr[1] + "-" + (months.indexOf(monthStr[0]) + 1));
			date.setMonth(date.getMonth() + monthOffset);
			_this.update(date);
		};

		_this.find('.next').click(function () {
			updateTable(1);

		});

		_this.find('.prev').click(function () {
			updateTable(-1);
		});

		return this;
	};

	$.fn.calendar.defaults = {
		date: new Date(),
		picker: false,
	};

	$.fn.datePicker = function () {
		var _this = this;
		var picker = $('<div></div>')
			.addClass('picker-container')
			.hide()
			.calendar({'date': strToDate(_this.val()), 'picker': true});

		_this.after(picker);

		/* event binding */
		// click outside area, make calendar disappear
		$('body').click(function () {
			picker.hide();
		});

		// click input should make calendar appear
		_this.click(function () {
			picker.show();
			return false; // stop sending event to docment
		});

		// click on calender, update input
		picker.click(function () {
			_this.val(picker.getCurrentDate());
			return false;
		});

		return this;
	};

	$(window).load(function () {
		$('.jquery-calendar').each(function () {
			$(this).calendar();
		});
		$('.date-picker:text').each(function () {
			$(this).datePicker();
		});
	});
}($));
