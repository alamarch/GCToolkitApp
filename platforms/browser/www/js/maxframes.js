"use strict";

// Init App
var myApp = new Framework7({
    modalTitle: "GCToolkit",
    // Enable Material theme
    material: true,
    pushState: true
});

// Expose Internal DOM library
var $$ = Dom7;


// Add main view
var mainView = myApp.addView('.view-main', {
});

$$("body").addClass("theme-" + GCTUser.Context());

// Add keypress functionality to modals
$$(document).on('keydown', '.modal-text-input', function(e){
    if(e.which == 27){
        $('.modal-button:contains("Cancel")').click();
    }
    if(e.which == 13){
        $('.modal-button:contains("OK")').click();
    }
});

// Show/hide preloader for remote ajax loaded pages
// Probably should be removed on a production/local app
$$(document).on('ajaxStart', function (e) {
    myApp.showIndicator();
});
$$(document).on('ajaxComplete', function () {
    myApp.hideIndicator();
});


/* ===== Swipe to delete events callback demo ===== */
myApp.onPageInit('swipe-delete', function (page) {
    $$('.demo-remove-callback').on('deleted', function () {
        myApp.alert('Thanks, item removed!');
    });
    
});


myApp.onPageInit('dashboard', function (page) {
    google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var data = google.visualization.arrayToDataTable([
          ['Dinosaur', 'Length'],
          ['Acrocanthosaurus (top-spined lizard)', 12.2],
          ['Albertosaurus (Alberta lizard)', 9.1],
          ['Allosaurus (other lizard)', 12.2],
          ['Apatosaurus (deceptive lizard)', 22.9],
          ['Archaeopteryx (ancient wing)', 0.9],
          ['Argentinosaurus (Argentina lizard)', 36.6],
          ['Baryonyx (heavy claws)', 9.1],
          ['Brachiosaurus (arm lizard)', 30.5],
          ['Ceratosaurus (horned lizard)', 6.1],
          ['Coelophysis (hollow form)', 2.7],
          ['Compsognathus (elegant jaw)', 0.9],
          ['Deinonychus (terrible claw)', 2.7],
          ['Diplodocus (double beam)', 27.1],
          ['Dromicelomimus (emu mimic)', 3.4],
          ['Gallimimus (fowl mimic)', 5.5],
          ['Mamenchisaurus (Mamenchi lizard)', 21.0],
          ['Megalosaurus (big lizard)', 7.9],
          ['Microvenator (small hunter)', 1.2],
          ['Ornithomimus (bird mimic)', 4.6],
          ['Oviraptor (egg robber)', 1.5],
          ['Plateosaurus (flat lizard)', 7.9],
          ['Sauronithoides (narrow-clawed lizard)', 2.0],
          ['Seismosaurus (tremor lizard)', 45.7],
          ['Spinosaurus (spiny lizard)', 12.2],
          ['Supersaurus (super lizard)', 30.5],
          ['Tyrannosaurus (tyrant lizard)', 15.2],
          ['Ultrasaurus (ultra lizard)', 30.5],
          ['Velociraptor (swift robber)', 1.8]]);

        var options = {
          legend: { position: 'none' },
        };

        var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
        
          
        chart.draw(data, options);
          
           var data = google.visualization.arrayToDataTable([
          ['Task', 'Hours per Day'],
          ['Work',     11],
          ['Eat',      2],               
          ['Sleep',    7]
        ]);

        var options = {
          pieHole: 0.3,
        };

        var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
        chart.draw(data, options);
          
          
      }
});
myApp.onPageInit('swipe-delete media-lists', function (page) {
    $$('.demo-reply').on('click', function () {
        myApp.alert('Reply');
    });
    $$('.demo-mark').on('click', function () {
        myApp.alert('Mark');
    });
    $$('.demo-forward').on('click', function () {
        myApp.alert('Forward');
    });
});


/* ===== Action sheet, we use it on few pages ===== */
myApp.onPageInit('swipe-delete modals media-lists', function (page) {
    var actionSheetButtons = [
        // First buttons group
        [
            // Group Label
            {
                text: 'Choose some action',
                label: true
            },
            // First button
            {
                text: 'Alert',
                onClick: function () {
                    myApp.alert('He Hoou!');
                }
            },
            // Second button
            {
                text: 'Second Alert',
                onClick: function () {
                    myApp.alert('Second Alert!');
                }
            },
            // Another red button
            {
                text: 'Nice Red Button ',
                color: 'red',
                onClick: function () {
                    myApp.alert('You have clicked red button!');
                }
            },
        ],
        // Second group
        [
            {
                text: 'Cancel'
            }
        ]
    ];
    $$('.demo-actions').on('click', function (e) {
        myApp.actions(actionSheetButtons);
    });
    $$('.demo-actions-popover').on('click', function (e) {
        // We need to pass additional target parameter (this) for popover
        myApp.actions(this, actionSheetButtons);
    });
    
});
        



/* ===== masonary Gallery Page ===== */
myApp.onPageInit('masonry', function (page) {
    $(document).ready( function(){
        $('.grid').masonry({
          itemSelector: '.grid-item'
        });
    });
        
    $('.swipebox' ).swipebox();
    
    $(".galleryone").click(function(){
        $(".grid").addClass("one");
        $(".grid").removeClass("two three");
        $('.grid').masonry({
          itemSelector: '.grid-item'
        });
    });
    
    $(".gallerytwo").click(function(){
        $(".grid").addClass("two");
        $(".grid").removeClass("one  three");
        $('.grid').masonry({
          itemSelector: '.grid-item'
        });
    });
    
    $(".gallerythree").click(function(){
        $(".grid").addClass("three");
        $(".grid").removeClass("two one");
        $('.grid').masonry({
          itemSelector: '.grid-item'
        });
    });
    
});







/* ===== Swipebox Gallery Page ===== */

myApp.onPageInit('gallery', function (page) {
        $('.swipebox' ).swipebox();
});



myApp.onPageInit('profile', function (page) {
        $('.swipebox' ).swipebox();
});
        
        
/* ===== Messages Page ===== */
myApp.onPageInit('messages', function (page) {

    var conversationStarted = false;
    var answers = [
        'Yes!',
        'No',
        'Hm...',
        'I am not sure',
        'And what about you?',
        'May be ;)',
        'Lorem ipsum dolor sit amet, consectetur',
        'What?',
        'Are you sure?',
        'Of course',
        'Need to think about it',
        'Amazing!!!',
    ];
    var people = [
        {
            name: 'Max Johnson',
            avatar: 'img/pic2.png'
        },
        {
            name: 'Stereo Doe',
            avatar: 'img/pic1.png'
        },
        
    ];
    var answerTimeout, isFocused;

    // Initialize Messages
    var myMessages = myApp.messages('.messages');

    // Initialize Messagebar
    var myMessagebar = myApp.messagebar('.messagebar');
    
    $$('.messagebar a.send-message').on('touchstart mousedown', function () {
        isFocused = document.activeElement && document.activeElement === myMessagebar.textarea[0];
    });
    $$('.messagebar a.send-message').on('click', function (e) {
        // Keep focused messagebar's textarea if it was in focus before
        if (isFocused) {
            e.preventDefault();
            myMessagebar.textarea[0].focus();
        }
        var messageText = myMessagebar.value();
        if (messageText.length === 0) {
            return;
        }
        // Clear messagebar
        myMessagebar.clear();

        // Add Message
        myMessages.addMessage({
            text: messageText,
            avatar: 'img/i-f7-material.png',
            type: 'sent',
            date: 'Now'
        });
        conversationStarted = true;
        // Add answer after timeout
        if (answerTimeout) clearTimeout(answerTimeout);
        answerTimeout = setTimeout(function () {
            var answerText = answers[Math.floor(Math.random() * answers.length)];
            var person = people[Math.floor(Math.random() * people.length)];
            myMessages.addMessage({
                text: answers[Math.floor(Math.random() * answers.length)],
                type: 'received',
                name: person.name,
                avatar: person.avatar,
                date: 'Just now'
            });
        }, 2000);
    });
});

/* ===== Pull To Refresh Demo ===== */
myApp.onPageInit('contacts', function (page) {
    // Dummy Content
    var songs = ['Sheela Joshi', 'Boxer Car', 'Makbul Ahemad', 'Lia'];
    var authors = ['India', 'Australia', 'Qatar', 'Clifornia'];
    // Pull to refresh content
    var ptrContent = $$(page.container).find('.pull-to-refresh-content');
    // Add 'refresh' listener on it
    ptrContent.on('refresh', function (e) {
        // Emulate 2s loading
        setTimeout(function () {
            var picURL = 'img/pic1.png';
            var song = songs[Math.floor(Math.random() * songs.length)];
            var author = authors[Math.floor(Math.random() * authors.length)];
            var linkHTML = '<li class="item-content">' +
                                '<div class="item-media"><img src="' + picURL + '" width="44"/></div>' +
                                '<div class="item-inner">' +
                                    '<div class="item-title-row">' +
                                        '<div class="item-title">' + song + '</div>' +
                                    '</div>' +
                                    '<div class="item-subtitle">' + author + '</div>' +
                                '</div>' +
                            '</li>';
            ptrContent.find('ul').prepend(linkHTML);
            // When loading done, we need to "close" it
            myApp.pullToRefreshDone();
        }, 2000);
    });
});




/* ===== Color themes ===== */
myApp.onPageInit('color-themes', function (page) {
    $$(page.container).find('.ks-color-theme').click(function () {
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('theme') === 0) classList.remove(classList[i]);
        }
        classList.add('theme-' + $$(this).attr('data-theme'));
    });
    $$(page.container).find('.ks-layout-theme').click(function () {
        var classList = $$('body')[0].classList;
        for (var i = 0; i < classList.length; i++) {
            if (classList[i].indexOf('layout-') === 0) classList.remove(classList[i]);
        }
        classList.add('layout-' + $$(this).attr('data-theme')); 
    });
});


/* ===== Calendar ===== */
myApp.onPageInit('profile todoadd', function (page) {
    // Default
    var calendarDefault = myApp.calendar({
        input: '#ks-calendar-default2',
    });
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format2',
        dateFormat: 'DD, MM dd, yyyy'
    });
});

myApp.onPageInit('register', function (page) {
    // Default
    var calendarDefault = myApp.calendar({
        input: '#ks-calendar-default2',
    });
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format2',
        dateFormat: 'DD, MM dd, yyyy'
    });
});

myApp.onPageInit('calendar todo', function (page) {
    // Default
    var calendarDefault = myApp.calendar({
        input: '#ks-calendar-default',
    });
    // With custom date format
    var calendarDateFormat = myApp.calendar({
        input: '#ks-calendar-date-format',
        dateFormat: 'DD, MM dd, yyyy'
    });
    // With multiple values
    var calendarMultiple = myApp.calendar({
        input: '#ks-calendar-multiple',
        dateFormat: 'M dd yyyy',
        multiple: true
    });
    
    // Inline with custom toolbar
    var monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August' , 'September' , 'October', 'November', 'December'];
    var calendarInline = myApp.calendar({
        container: '#ks-calendar-inline-container',
        value: [new Date()],
        weekHeader: false,
        header: false,
        footer: false,
        toolbarTemplate: 
            '<div class="toolbar calendar-custom-toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-back"></i></a>' +
                    '</div>' +
                    '<div class="center"></div>' +
                    '<div class="right">' +
                        '<a href="#" class="link icon-only"><i class="icon icon-forward"></i></a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        onOpen: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
            $$('.calendar-custom-toolbar .left .link').on('click', function () {
                calendarInline.prevMonth();
            });
            $$('.calendar-custom-toolbar .right .link').on('click', function () {
                calendarInline.nextMonth();
            });
        },
        onMonthYearChangeStart: function (p) {
            $$('.calendar-custom-toolbar .center').text(monthNames[p.currentMonth] +', ' + p.currentYear);
        }
    });
});


/* ===== Pickers ===== */
myApp.onPageInit('pickers', function (page) {
    var today = new Date();

    // iOS Device picker
    var pickerDevice = myApp.picker({
        input: '#ks-picker-device',
        cols: [
            {
                textAlign: 'center',
                values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
            }
        ]
    });

    // Describe yourself picker
    var pickerDescribe = myApp.picker({
        input: '#ks-picker-describe',
        rotateEffect: true,
        cols: [
            {
                textAlign: 'left',
                values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
            },
            {
                values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
            },
        ]
    });

    // Dependent values
    var carVendors = {
        Japanese : ['Honda', 'Lexus', 'Mazda', 'Nissan', 'Toyota'],
        German : ['Audi', 'BMW', 'Mercedes', 'Volkswagen', 'Volvo'],
        American : ['Cadillac', 'Chrysler', 'Dodge', 'Ford']
    };
    var pickerDependent = myApp.picker({
        input: '#ks-picker-dependent',
        rotateEffect: true,
        formatValue: function (picker, values) {
            return values[1];
        },
        cols: [
            {
                textAlign: 'left',
                values: ['Japanese', 'German', 'American'],
                onChange: function (picker, country) {
                    if(picker.cols[1].replaceValues){
                        picker.cols[1].replaceValues(carVendors[country]);
                    }
                }
            },
            {
                values: carVendors.Japanese,
                width: 160,
            },
        ]
    });

    // Custom Toolbar
    var pickerCustomToolbar = myApp.picker({
        input: '#ks-picker-custom-toolbar',
        rotateEffect: true,
        toolbarTemplate: 
            '<div class="toolbar">' +
                '<div class="toolbar-inner">' +
                    '<div class="left">' +
                        '<a href="#" class="link toolbar-randomize-link">Randomize</a>' +
                    '</div>' +
                    '<div class="right">' +
                        '<a href="#" class="link close-picker">That\'s me</a>' +
                    '</div>' +
                '</div>' +
            '</div>',
        cols: [
            {
                values: ['Mr', 'Ms'],
            },
            {
                textAlign: 'left',
                values: ('Super Lex Amazing Bat Iron Rocket Lex Cool Beautiful Wonderful Raining Happy Amazing Funny Cool Hot').split(' ')
            },
            {
                values: ('Man Luthor Woman Boy Girl Person Cutie Babe Raccoon').split(' ')
            },
        ],
        onOpen: function (picker) {
            picker.container.find('.toolbar-randomize-link').on('click', function () {
                var col0Values = picker.cols[0].values;
                var col0Random = col0Values[Math.floor(Math.random() * col0Values.length)];

                var col1Values = picker.cols[1].values;
                var col1Random = col1Values[Math.floor(Math.random() * col1Values.length)];

                var col2Values = picker.cols[2].values;
                var col2Random = col2Values[Math.floor(Math.random() * col2Values.length)];
                
                picker.setValue([col0Random, col1Random, col2Random]);
            });
        }
    });

    // Inline date-time
    var pickerInline = myApp.picker({
        input: '#ks-picker-date',
        container: '#ks-picker-date-container',
        toolbar: false,
        rotateEffect: true,
        value: [today.getMonth(), today.getDate(), today.getFullYear(), today.getHours(), (today.getMinutes() < 10 ? '0' + today.getMinutes() : today.getMinutes())],
        onChange: function (picker, values, displayValues) {
            var daysInMonth = new Date(picker.value[2], picker.value[0]*1 + 1, 0).getDate();
            if (values[1] > daysInMonth) {
                picker.cols[1].setValue(daysInMonth);
            }
        },
        formatValue: function (p, values, displayValues) {
            return displayValues[0] + ' ' + values[1] + ', ' + values[2] + ' ' + values[3] + ':' + values[4];
        },
        cols: [
            // Months
            {
                values: ('0 1 2 3 4 5 6 7 8 9 10 11').split(' '),
                displayValues: ('January February March April May June July August September October November December').split(' '),
                textAlign: 'left'
            },
            // Days
            {
                values: [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31],
            },
            // Years
            {
                values: (function () {
                    var arr = [];
                    for (var i = 1950; i <= 2030; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Space divider
            {
                divider: true,
                content: '&nbsp;&nbsp;'
            },
            // Hours
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 23; i++) { arr.push(i); }
                    return arr;
                })(),
            },
            // Divider
            {
                divider: true,
                content: ':'
            },
            // Minutes
            {
                values: (function () {
                    var arr = [];
                    for (var i = 0; i <= 59; i++) { arr.push(i < 10 ? '0' + i : i); }
                    return arr;
                })(),
            }
        ]
    });
});


google.charts.load('current', {'packages':['corechart','geochart','bar','table']});

myApp.onPageInit('chart', function (page) {
    // Load the Visualization API and the corechart package.
     

    $(document).ready( function(){
              google.charts.setOnLoadCallback(drawChart);
                    function drawChart() {
                        
                        /* Donut chart */
                        var data = google.visualization.arrayToDataTable([
                          ['Task', 'Hours per Day'],
                          ['Work',     11],
                          ['Eat',      2],
                          ['Commute',  2],
                          ['Watch TV', 2],
                          ['Sleep',    7]
                      ]);

                     var options = {
                        title: '',
                        pieHole: 0.34
                      };

                      var chart = new google.visualization.PieChart(document.getElementById('donutchart'));
                      chart.draw(data, options);
                                 
                     /* Pie chart */
                      var data2 = google.visualization.arrayToDataTable([
                        ['Task', 'Hours per Day'],
                        ['Work',     11],
                        ['Eat',      2],
                        ['Commute',  2],
                        ['Watch TV', 2],
                        ['Sleep',    7]
                        ]);
                      var options2 = {
                        title: ''
                      };

                      var chart2 = new google.visualization.PieChart(document.getElementById('piechart'));

                      chart2.draw(data2, options2);
                    
                          
                      
                        
                        /* bar chart */                      
                        var data3 = google.visualization.arrayToDataTable([
                          ['Year', 'Sales', 'Expenses', 'Profit'],
                          ['2014', 1000, 400, 200],
                          ['2015', 1170, 460, 250],
                          ['2016', 660, 1120, 300],
                          ['2017', 1030, 540, 350]
                        ]);

                        var options3 = {
                          chart: {
                            title: '',
                            subtitle: '',
                          }
                        };
                        var chart3 = new google.charts.Bar(document.getElementById('columnchart_material'));
                        chart3.draw(data3, options3);
      
                        
                        
                        /* tabel chart */
                        var data4 = new google.visualization.DataTable();
                        data4.addColumn('string', 'Name');
                        data4.addColumn('number', 'Salary');
                        data4.addColumn('boolean', 'Full Time Employee');
                        data4.addRows([
                          ['Mike',  {v: 10000, f: '$10,000'}, true],
                          ['Jim',   {v:8000,   f: '$8,000'},  false],
                          ['Alice', {v: 12500, f: '$12,500'}, true],
                          ['Bob',   {v: 7000,  f: '$7,000'},  true]
                        ]);

                        var table = new google.visualization.Table(document.getElementById('table_div'));

                        table.draw(data4, {showRowNumber: true, width: '100%', height: '100%'});
                        
                        
                        
                        /* Area chart */
                      
                        var data5 = google.visualization.arrayToDataTable([
                          ['Year', 'Sales', 'Expenses'],
                          ['2013',  1000,      400],
                          ['2014',  1170,      460],
                          ['2015',  660,       1120],
                          ['2016',  1030,      540]
                        ]);

                        var options5 = {
                          title: '',
                          hAxis: {title: 'Year',  titleTextStyle: {color: '#333'}},
                          vAxis: {minValue: 0}
                        };

                        var chart5 = new google.visualization.AreaChart(document.getElementById('areachart_div'));
                        chart5.draw(data5, options5);
                      
                    
                    
                };
                    
            

              google.charts.setOnLoadCallback(drawRegionsMap);

              function drawRegionsMap() {

                var data = google.visualization.arrayToDataTable([
                  ['Country', 'Popularity'],
                  ['Germany', 200],
                  ['United States', 300],
                  ['Brazil', 400],
                  ['Canada', 500],
                  ['France', 600],
                  ['India', 600],
                  ['RU', 700]
                ]);

                var options = {};

                var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

                chart.draw(data, options);
              }
        });
});

var txtWire = "<div class='swiper-slide card list-block media-list'>"
    + "<ul><li><div class='item-link item-content' onclick='ShowProfile({owner});'>"
        + "<div class='item-media'><img src='{icon}' /></div>"
        + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
                + "<div class='author'>{name}</div>"
            + "</div>"
            + "<div class='time'>{date}</div>"
        + "</div>"
    + "</div></li></ul>"
    + "<div class='content-block'>"
        + "<div class='item-text'>{description}</div>"
        + "<div class='row'>"
            + "<div class='col-45 icons' data-guid='{guid}' data-type='{type}'><i class='fa fa-2x fa-reply {replied}' aria-hidden='true' onclick='GCTUser.ReplyToPost(this);'></i><i class='fa fa-2x fa-share-alt-square' aria-hidden='true' onclick='GCTUser.SharePost(this);'></i><i class='fa fa-2x fa-thumbs-up {liked}' aria-hidden='true' onclick='GCTUser.LikePost(this);'></i>{likes}</div>"
            + "<div class='col-55'><a class='action button button-fill button-link' data-guid='{guid}' data-type='{type}' onclick='GCTUser.ViewPost(this);'>{action}</a></div>"
        + "</div>"
    + "</div>"
+ "</div>";

var txtNewsfeed = "<div class='swiper-slide card list-block media-list'>"
    + "<ul><li><div class='item-link item-content' onclick='ShowProfile({owner});'>"
        + "<div class='item-media'><img src='{icon}' /></div>"
        + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
                + "<div class='author'>{name}</div>"
            + "</div>"
            + "<div class='time'>{date}</div>"
        + "</div>"
    + "</div></li></ul>"
    + "<div class='content-block'>"
        + "<div class='item-text'>{name} {description} {more}</div>"
        + "<div class='item-text'>{text}</div>"
        + "<div class='row'>"
            + "<div class='col-45 icons' data-guid='{guid}' data-type='{type}'><i class='fa fa-2x fa-reply {replied}' aria-hidden='true' onclick='GCTUser.ReplyToPost(this);'></i><i class='fa fa-2x fa-share-alt-square' aria-hidden='true' onclick='GCTUser.SharePost(this);'></i><i class='fa fa-2x fa-thumbs-up {liked}' aria-hidden='true' onclick='GCTUser.LikePost(this);'></i>{likes}</div>"
            + "{action}"
        + "</div>"
    + "</div>"
+ "</div>";

var txtBlog = "<div class='swiper-slide card list-block media-list'>"
    + "<ul><li><div class='item-link item-content' onclick='ShowProfile({owner});'>"
        + "<div class='item-media'><img src='{icon}' /></div>"
        + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
                + "<div class='author'>{name}</div>"
            + "</div>"
            + "<div class='time'>{date}</div>"
        + "</div>"
    + "</div></li></ul>"
    + "<div class='content-block'><h3>{title}</h3>"
        + "<div class='item-text'>{description}</div>"
        + "<div class='row'>"
            + "<div class='col-45 icons' data-guid='{guid}' data-type='{type}'><i class='fa fa-2x fa-reply {replied}' aria-hidden='true' onclick='GCTUser.ReplyToPost(this);'></i><i class='fa fa-2x fa-share-alt-square' aria-hidden='true' onclick='GCTUser.SharePost(this);'></i><i class='fa fa-2x fa-thumbs-up {liked}' aria-hidden='true' onclick='GCTUser.LikePost(this);'></i>{likes}</div>"
            + "<div class='col-55'><a class='action button button-fill button-link' data-guid='{guid}' data-type='{type}' onclick='GCTUser.ViewPost(this);'>{action}</a></div>"
        + "</div>"
    + "</div>"
+ "</div>";

var txtGroup = "<div class='swiper-slide card list-block media-list'>"
    + "<ul><li><div class='item-link item-content' onclick='ShowGroup({owner});'>"
        + "<div class='item-media'><img src='{icon}' /></div>"
        + "<div class='item-inner'>"
            + "<div class='item-title-row'>"
                + "<div class='author'>{name}</div>"
            + "</div>"
            + "<div class='time'>{count}</div>"
        + "</div>"
    + "</div></li></ul>"
    + "<div class='content-block'>"
        + "<div class='item-text'>{description}</div>"
        + "<div class='row'>"
            + "<div class='col-45 icons' data-guid='{guid}' data-type='{type}'><i class='fa fa-2x fa-share-alt-square' aria-hidden='true' onclick='GCTUser.SharePost(this);'></i><i class='fa fa-2x fa-thumbs-up {liked}' aria-hidden='true' onclick='GCTUser.LikePost(this);'></i>{likes}</div>"
            + "<div class='col-55'><a class='action button button-fill button-link' data-guid='{guid}' data-type='{type}' onclick='GCTUser.ViewGroup(this);'>{action}</a></div>"
        + "</div>"
    + "</div>"
+ "</div>";

myApp.onPageInit('sign-in', function (page) {
    //### Disable back button in case user came from splash page
    //$$('.view-main .page-on-left').remove();

    var email = GCTUser.LastLoginEmail();
    $('#txtEmail').val(email);
    EmailEntry();   
});

function GetNewCode() {
    GCTUser.SendValidation(function(success){
        if (success.message.length > 0) { ///### Going to have to make some of these returns more descriptive e.g. Invalid Email or Email Extension
            EnterCode();        
        } else {
            myApp.alert('Sorry, we were unable to send you the verification code at this time.');
        }
    }, function(error){
        //todo
    });
}

function EnterCode(code) {
    if (typeof code == 'undefined') {
        myApp.prompt('Please enter the verification code sent to ' + GCTUser.Email() + ' in the box below:', function (value) {
            GCTUser.SendValidationCode(value, function(success){
                var txt = "";
                if (success.status > 0) {
                    GCTUser.SetAPIKey(success.message);
                    txt = "Success";
                    GCTUser.SetUserProfile();
                    myApp.mainView.router.load({ url: "home.html" }); //### Not sure if we should do this here or back in the code. Might make sense for every APIKey set sends to homepage.
                }

                if (txt == '') {
                    myApp.confirm('Your code could not be validated. Press OK to enter your code again.', 'Code Not Valid',
                        function () {
                            EnterCode();
                        }
                    );
                }
            }, function(error){
                //todo
            });
        });
        $('.modal-text-input').focus();
    } else {
        GCTUser.SendValidationCode(code, function(success){
            var txt = "";
            if (success.status > 0) {
                GCTUser.SetAPIKey(success.message);
                txt = "Success";
                GCTUser.SetUserProfile();
                myApp.mainView.router.load({ url: "home.html" }); //### Not sure if we should do this here or back in the code. Might make sense for every APIKey set sends to homepage.
            }

            if (txt == '') {
                myApp.confirm('Your code could not be validated. Press OK to enter your code again.', 'Code Not Valid',
                    function () {
                        EnterCode();
                    }
                );
            }
        }, function(error){
            //todo
        });
    }
}

function EmailEntry(){
    var txt = $('#txtEmail').val();
    GCTUser.SaveLoginEmail(txt);
    if (!isValidEmailAddress(txt)) { 
        $('#txtGetNewCode').addClass("disabled");
        $('#txtEnterCode').addClass("disabled");
    } else {
        $('#txtGetNewCode').removeClass("disabled");
        $('#txtEnterCode').removeClass("disabled");
    }
}

function isValidEmailAddress(emailAddress) {
    var pattern = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
    return pattern.test(emailAddress);
};

function addDays(date, days) {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
}

function ShowProfile(email) {
    if (typeof email == 'undefined')
        email = GCTUser.Email(); //### Get current users profile

    console.log('show profileof ' + email);

    // Profile tab
    GCTUser.GetUserProfile(email, function(data) {
        var profileData = data.result;
        console.log(profileData);

        GCTUser.GetUserGroups(email, function(data2) {
            var groupData = data2.result;

            var groups = "";
            $(groupData).each(function( key, value ) {
                // Removes HTML components from Blog
                var text = $(value.description).text();
                // var text = value.description;
                
                var members = (value.count > 0) ? value.count + (value.count == 1 ? " member" : " members") : "";
                
                groups += "<li><a href='" + value.url + "' class='item-link item-content'>"
                    + "<div class='item-inner'>"
                        + "<div class='item-title-row no-padding-right'>"
                          + "<div class='item-title reg-text'>" + value.name + "</div>"
                          + "<div class='item-after'>" + members + "</div>"
                        + "</div>"
                        + "<div class='row'>"
                            + "<div class='col-25'><img src='" + value.iconURL + "' width='50' alt='" + value.name + "'></div>"
                            + "<div class='col-75 item-text more-text'>" + text.trunc(500) + "</div>"
                        + "</div>"
                    + "</div>"
                + "</a></li>";
            });

            $('#user-groups').html(groups);
        });

        GCTUser.GetUserActivity(email, 10, 0, function(data3) {
            var activityData = data3.result;
            
            var activity = "";
            $(activityData).each(function( key, value ) {
                var type = "";
                if( value.object.type == "wire" ){
                    type = "the wire:";
                } else if( value.description == "river:update:user:default" ){
                    type = "";
                } else if( value.object.type == "group" ) {
                    type = "<strong>" + value.object.name + "</strong>";
                } else {
                    type = "<strong>" + value.object.displayName + "</strong>";
                }

                var description = "";
                if( value.description == "river:update:user:default" ){
                    description = "has a new avatar";
                } else if( value.description == "river:reply:object:default" ){
                    description = "replied on the discussion topic";
                } else {
                    description = value.description;
                }

                var content = "";
                var showMore = false;
                if( value.object.type == "wire" ){
                    showMore = true;
                    content = value.object.wire;
                } else {
                    content = value.userDetails.displayName + description + type;
                }

                activity += "<li><a href='" + value.url + "' class='item-link item-content'>"
                    + "<div class='item-inner'>";
                    if( showMore ){
                        activity += "<div class='item-title-row no-padding-right'>"
                          + "<div class='item-title reg-text activity-description'>" + value.userDetails.displayName + description + type + "</div>"
                        + "</div>";
                    }
                        activity += "<div class='row'>"
                            + "<div class='col-25'><img src='" + value.userDetails.iconURL + "' width='50' alt='" + value.userDetails.displayName + "'></div>"
                            + "<div class='col-75 item-text more-text'>" + content + "</div>"
                        + "</div>"
                    + "</div>"
                + "</a></li>";
            });

            $('#user-activity').html(activity);
        });
        
        var profile = '<div class="toolbar tabbar">'
            + '<div class="toolbar-inner"><a href="#tab-profile" class="button active tab-link">Profile</a><a href="#tab-groups" class="button tab-link">Groups</a><a href="#tab-activity" class="button tab-link">Activity</a></div>'
            + '</div>'

            + '<div class="tabs">'

            + '<div id="tab-profile" class="tab page-content active">'
              + '<div class="item-content userprofile">'
                + '<div class="item-media"><img src="' + profileData.iconURL + '" width="44" alt=""></div>'
                + '<div class="item-inner">'
                  + '<div class="item-title-row">'
                    + '<div class="item-title">' + profileData.displayName + '</div>'
                  + '</div>'
                  + '<div class="item-subtitle">' + profileData.department + '</div>'
                + '</div>'
              + '</div>'
              + '<div class="content-block text-center vmargin-10">'
                + '<div class="row profiles">'
                  + '<div class="col-33 profiles">' + profileData.wires + '</div>'
                  + '<div class="col-33 profiles">' + profileData.blogs + '</div>'
                  + '<div class="col-33 profiles">' + profileData.colleagues + '</div>'
                + '</div>'
                + '<div class="row profile stats">'
                  + '<div class="col-33 profile stats font-13">Wires</div>'
                  + '<div class="col-33 profile stats font-13">Blogs</div>'
                  + '<div class="col-33 profile stats font-13">Colleagues</div>'
                + '</div>'
              + '</div>'
              + '<hr />'
              + '<div class="page-content">'
                + '<div class="list-block inputs-list vmargin-10">'
                  + '<ul>'
                    + '<li>'
                      + '<div class="item-content">'
                        + '<div class="item-inner">'
                          + '<div class="item-title label">Name</div>'
                          + '<div class="item-text">' + profileData.displayName + '</div>'
                        + '</div>'
                      + '</div>'
                    + '</li>'
                    + '<li>'
                      + '<div class="item-content">'
                        + '<div class="item-inner">'
                          + '<div class="item-title label">Organization</div>'
                          + '<div class="item-text">' + profileData.department + '</div>'
                        + '</div>'
                      + '</div>'
                    + '</li>';
                if( profileData.hasOwnProperty("jobTitle") && profileData.jobTitle !== null && profileData.jobTitle !== "" ){
                    profile += '<li>'
                      + '<div class="item-content">'
                        + '<div class="item-inner">'
                          + '<div class="item-title label">Job Title</div>'
                          + '<div class="item-text">' + profileData.jobTitle + '</div>'
                        + '</div>'
                      + '</div>'
                    + '</li>';
                }
                    profile += '<li>'
                      + '<div class="item-content">'
                        + '<div class="item-inner">'
                          + '<div class="item-title label">Email</div>'
                          + '<div class="item-text">' + profileData.email + '</div>'
                        + '</div>'
                      + '</div>'
                    + '</li>';
                if( profileData.hasOwnProperty("telephone") && profileData.telephone !== null && profileData.telephone !== "" ){
                    profile += '<li>'
                      + '<div class="item-content">'
                        + '<div class="item-inner">'
                          + '<div class="item-title label">Phone</div>'
                          + '<div class="item-text">' + profileData.telephone + '</div>'
                        + '</div>'
                      + '</div>'
                    + '</li>';
                }
                if( profileData.hasOwnProperty("about_me") && profileData.about_me !== null && profileData.about_me !== "" ){
                    profile += '<li class="align-top">'
                      + '<div class="item-content">'
                        + '<div class="item-inner">'
                          + '<div class="item-title label">About Me</div>'
                          + '<div class="item-text">' + profileData.about_me + '</div>'
                        + '</div>'
                      + '</div>'
                    + '</li>';
                }
                  profile += '</ul>'
                + '</div>'
                + '<hr />';
            if( profileData.hasOwnProperty("links") ){
                profile += '<div id="social-media" class="content-block vmargin-10">'
                  + '<div class="center">Social Media</div>'
                      + '<ul class="socials">';
                        if( profileData.links.hasOwnProperty("github") ){ profile += '<li><a id="user-github" href="' + profileData.links.github + '" class="gh external"><i class="fa fa-github"></i></a></li>'; }
                        if( profileData.links.hasOwnProperty("twitter") ){ profile += '<li><a id="user-twitter" href="' + profileData.links.twitter + '" class="tw external"><i class="fa fa-twitter"></i></a></li>'; }
                        if( profileData.links.hasOwnProperty("linkedin") ){ profile += '<li><a id="user-linkedin" href="' + profileData.links.linkedin + '" class="li external"><i class="fa fa-linkedin"></i></a></li>'; }
                        if( profileData.links.hasOwnProperty("facebook") ){ profile += '<li><a id="user-facebook" href="' + profileData.links.facebook + '" class="fb external"><i class="fa fa-facebook"></i></a></li>'; }
                      profile += '</ul>'
                  + '</div>';
            }
            profile += '</div>'
            + '</div>'

            + '<div id="tab-groups" class="tab page-content">'
              + '<div class="list-block media-list"><ul id="user-groups"></ul></div>'
            + '</div>'
            + '<div id="tab-activity" class="tab page-content">'
              + '<div class="list-block media-list"><ul id="user-activity"></ul></div>'
            + '</div>'

            + '</div>'

            + '<div class="buttonbar row no-gutter">'
              + '<a href="#" class="button button-fill col-100 close-panel">Add Colleague</a>'
            + '</div>';

        $('#panel-right-content').html(profile);
        $('#panel-right-button').data('guid', '').attr('onclick', "").text('Close');
        myApp.showTab('#tab-profile');
        myApp.openPanel('right');
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
}

myApp.onPageInit('*', function (page) {
    $(".navbar .center a").text(GCTUser.PrettyContext());
    $(".context").addClass(GCTUser.Context());
});

myApp.onPageInit('home', function (page) {
    var limit = 10;
    var offset = 0;

    GCTUser.GetWires(limit, offset, function(data){
        var wires = data.result;
        $('#GCcollabUserWireContent .loading').remove();

        $.each(wires, function (key, value) {
            // Removes HTML components from Wire
            // var text = $(value.description).text();
            var text = value.description;
            if( value.shareText && value.shareURL ){
                text += "<p class='wire-share'>Source: <a class='external' href='" + value.shareURL + "'>" + value.shareText + "</a></p>";
            }

            var replied = (value.replied) ? "active" : "";
            var liked = (value.liked) ? "active" : "";
            var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

            var content = txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
            $(content).hide().appendTo('#GCcollabUserWireContent').fadeIn(1000);
        });

        var swiper = new Swiper('.swiper-container.swiper-wires', {
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            }
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    GCTUser.GetNewsfeed(limit, offset, function(data){
        var newsfeed = data.result;
        $('#GCcollabUserNewsfeedContent .loading').remove();

        $.each(newsfeed, function (key, value) {
            var liked = (value.liked) ? "active" : "";
            var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

            var more = "";
            if( value.object.type == "wire" ){
                more = "the wire:";
            } else if( value.description == "river:update:user:default" ){
                more = "";
            } else {
                more = "<strong>" + value.object.name + "</strong>";
            }

            var description = "";
            if( value.description == "river:update:user:default" ){
                description = "has a new avatar";
            } else if( value.description == "river:reply:object:default" ){
                description = "replied on the discussion topic";
            } else {
                description = value.description;
            }

            var text = "";
            if( value.object.type == "wire" ){
                text = value.object.wire;
            }

            var action = "";
            if( value.object.type == "wire" ){
                action = "<div class='col-55'><a class='action button button-fill button-link' data-guid='{guid}' data-type='gccollab_wire_post' onclick='GCTUser.ViewPost(this);'>View Wire Post ></a></div>";
            }

            var content = txtNewsfeed.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_posted))
                .replace('{more}', more).replace('{description}', description).replace('{text}', text)
                .replace('{action}', action).replace('{owner}', value.subject_guid)
                .replace(/{guid}/g, value.object_guid).replace(/{type}/g, "gccollab_newfeed_post")
                .replace('{liked}',liked).replace('{likes}',likes);
            $(content).hide().appendTo('#GCcollabUserNewsfeedContent').fadeIn(1000);
        });

        var swiper = new Swiper('.swiper-container.swiper-newsfeed', {
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            }
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    GCTUser.GetBlogs(limit, offset, function(data){
        var blogs = data.result;
        $('#GCcollabUserBlogContent .loading').remove();

        $.each(blogs, function (key, value) {
            // Removes HTML components from Blog
            var text = $(value.description).text();
            // var text = value.description;

            var liked = (value.liked) ? "active" : "";
            var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

            var content = txtBlog.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                .replace('{description}', text.trunc(150)).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_blog_post")
                .replace('{action}', "View Blog Post >").replace('{owner}', value.owner_guid).replace("{title}",value.title)
                .replace('{liked}',liked).replace('{likes}',likes);
            $(content).hide().appendTo('#GCcollabUserBlogContent').fadeIn(1000);
        });

        var swiper = new Swiper('.swiper-container.swiper-blogs', {
            pagination: '.swiper-pagination',
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            coverflow: {
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true
            }
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
});

myApp.onPageInit('wire', function (page) {
    var limit = 20;
    var offset = 0;
    var wiresAllMoreOffset = 0;
    var wiresColleaguesMoreOffset = 0;
    var wiresMineMoreOffset = 0;

    GCTUser.GetWires(limit, offset, function(data){
        var wires = data.result;

        $.each(wires, function (key, value) {
            // Removes HTML components from Blog
            // var text = $(value.description).text();
            var text = value.description;

            var replied = (value.replied) ? "active" : "";
            var liked = (value.liked) ? "active" : "";
            var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

            var content = txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
            $(content).hide().appendTo('#wires-all').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    GCTUser.GetWiresByUserColleague(limit, offset, function(data){
        var wires = data.result;

        $.each(wires, function (key, value) {
            // Removes HTML components from Blog
            // var text = $(value.description).text();
            var text = value.description;

            var replied = (value.replied) ? "active" : "";
            var liked = (value.liked) ? "active" : "";
            var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

            var content = txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
            $(content).hide().appendTo('#wires-colleagues').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    GCTUser.GetWiresByUser(GCTUser.Email(), limit, offset, function(data){
        var wires = data.result;

        $.each(wires, function (key, value) {
            // Removes HTML components from Blog
            // var text = $(value.description).text();
            var text = value.description;

            var replied = (value.replied) ? "active" : "";
            var liked = (value.liked) ? "active" : "";
            var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

            var content = txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
            $(content).hide().appendTo('#wires-mine').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });

    var wiresAllMore = $$(page.container).find('#wires-all-more');
    wiresAllMore.on('click', function (e) {
        GCTUser.GetWires(limit, wiresAllMoreOffset + limit, function(data){
            var wires = data.result;

            $.each(wires, function (key, value) {
                // Removes HTML components from Blog
                // var text = $(value.description).text();
                var text = value.description;

                var replied = (value.replied) ? "active" : "";
                var liked = (value.liked) ? "active" : "";
                var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

                var content = txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                    .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                    .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                    .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
                $(content).hide().appendTo('#wires-all').fadeIn(1000);
            });

            wiresAllMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var wiresColleaguesMore = $$(page.container).find('#wires-colleagues-more');
    wiresColleaguesMore.on('click', function (e) {
        GCTUser.GetWiresByUserColleague(limit, wiresColleaguesMoreOffset + limit, function(data){
            var wires = data.result;

            $.each(wires, function (key, value) {
                // Removes HTML components from Blog
                // var text = $(value.description).text();
                var text = value.description;

                var replied = (value.replied) ? "active" : "";
                var liked = (value.liked) ? "active" : "";
                var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

                var content = txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                    .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                    .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                    .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
                $(content).hide().appendTo('#wires-colleagues').fadeIn(1000);
            });

            wiresColleaguesMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var wiresMineMore = $$(page.container).find('#wires-mine-more');
    wiresMineMore.on('click', function (e) {
        GCTUser.GetWiresByUser(GCTUser.Email(), limit, wiresMineMoreOffset + limit, function(data){
            var wires = data.result;

            $.each(wires, function (key, value) {
                // Removes HTML components from Blog
                // var text = $(value.description).text();
                var text = value.description;

                var replied = (value.replied) ? "active" : "";
                var liked = (value.liked) ? "active" : "";
                var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

                var content = txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                    .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                    .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                    .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
                $(content).hide().appendTo('#wires-mines').fadeIn(1000);
            });

            wiresMineMoreOffset += limit;
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    });

    var refreshWires = $$(page.container).find('.pull-to-refresh-content');
    refreshWires.on('refresh', function (e) {
        GCTUser.GetWires(limit, offset, function(data){
            var wires = data.result;

            var content = "";
            $.each(wires, function (key, value) {
                // Removes HTML components from Blog
                // var text = $(value.description).text();
                var text = value.description;

                var replied = (value.replied) ? "active" : "";
                var liked = (value.liked) ? "active" : "";
                var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

                content += txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                    .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                    .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                    .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
            });
            $('#wires-all').html('');
            $(content).hide().appendTo('#wires-all').fadeIn(1000);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetWiresByUserColleague(limit, offset, function(data){
            var wires = data.result;

            var content = "";
            $.each(wires, function (key, value) {
                // Removes HTML components from Blog
                // var text = $(value.description).text();
                var text = value.description;

                var replied = (value.replied) ? "active" : "";
                var liked = (value.liked) ? "active" : "";
                var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

                content += txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                    .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                    .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                    .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
            });
            $('#wires-colleagues').html('');
            $(content).hide().appendTo('#wires-colleagues').fadeIn(1000);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        GCTUser.GetWiresByUser(GCTUser.Email(), limit, offset, function(data){
            var wires = data.result;

            var content = "";
            $.each(wires, function (key, value) {
                // Removes HTML components from Blog
                // var text = $(value.description).text();
                var text = value.description;

                var replied = (value.replied) ? "active" : "";
                var liked = (value.liked) ? "active" : "";
                var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

                content += txtWire.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_created))
                    .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                    .replace('{action}', "View Wire Post >").replace('{owner}',value.owner_guid)
                    .replace('{replied}',replied).replace('{liked}',liked).replace('{likes}',likes);
            });
            $('#wires-mine').html('');
            $(content).hide().appendTo('#wires-mines').fadeIn(1000);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });

        wiresAllMoreOffset = 0;
        wiresColleaguesMoreOffset = 0;
        wiresMineMoreOffset = 0;

        myApp.pullToRefreshDone();
    });
});

myApp.onPageInit('groups', function (page) {
    var limit = 20;
    var offset = 0;

    GCTUser.GetGroups(limit, offset, function(data){
        var groups = data.result;
        console.log(groups);

        $.each(groups, function (key, value) {
            // Removes HTML components from Blog
            var text = $(value.description).text();
            // var text = (value.description !== null) ? value.description : "";

            var liked = (value.liked) ? "active" : "";
            var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";
            var members = (value.count > 0) ? value.count + (value.count == 1 ? " member" : " members") : "";

            var content = txtGroup.replace('{icon}', value.iconURL).replace(/{name}/g, value.name).replace('{count}', members)
                .replace('{description}', text).replace(/{guid}/g, value.guid).replace(/{type}/g, "gccollab_wire_post")
                .replace('{action}', "View Group >").replace('{owner}',value.guid)
                .replace('{liked}',liked).replace('{likes}',likes);
            $(content).hide().appendTo('#groups-all').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
});

myApp.onPageInit('newsfeed', function (page) {
    var limit = 20;
    var offset = 0;

    GCTUser.GetNewsfeed(limit, offset, function(data){
        var newsfeed = data.result;

        $.each(newsfeed, function (key, value) {
            var liked = (value.liked) ? "active" : "";
            var likes = (value.likes > 0) ? "<span class='like-count' onclick='GCTUser.GetLikeUsers(this);'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

            var more = "";
            if( value.object.type == "wire" ){
                more = "the wire:";
            } else if( value.description == "river:update:user:default" ){
                more = "";
            } else {
                more = "<strong>" + value.object.name + "</strong>";
            }

            var description = "";
            if( value.description == "river:update:user:default" ){
                description = "has a new avatar";
            } else if( value.description == "river:reply:object:default" ){
                description = "replied on the discussion topic";
            } else {
                description = value.description;
            }

            var text = "";
            if( value.object.type == "wire" ){
                text = value.object.wire;
            }

            var action = "";
            if( value.object.type == "wire" ){
                action = "<div class='col-55'><a class='action button button-fill button-link' data-guid='{guid}' data-type='gccollab_wire_post' onclick='GCTUser.ViewPost(this);'>View Wire Post ></a></div>";
            }

            var content = txtNewsfeed.replace('{icon}', value.userDetails.iconURL).replace(/{name}/g, value.userDetails.displayName).replace('{date}', prettyDate(value.time_posted))
                .replace('{more}', more).replace('{description}', description).replace('{text}', text)
                .replace('{action}', action).replace('{owner}', value.subject_guid)
                .replace(/{guid}/g, value.object_guid).replace(/{type}/g, "gccollab_newfeed_post")
                .replace('{liked}',liked).replace('{likes}',likes);
            $(content).hide().appendTo('#newsfeed-all').fadeIn(1000);
        });
    }, function(jqXHR, textStatus, errorThrown){
        console.log(jqXHR, textStatus, errorThrown);
    });
});

myApp.onPageInit('members', function (page) {
    var limit = 20;
    var offset = 0;

    console.log('get all members');
});

/* ===== Change statusbar bg when panel opened/closed ===== */
$$('.panel-left').on('open', function () {
    $$('.statusbar-overlay').addClass('with-panel-left');
});



$$('.panel-left, .panel-right').on('close', function () {
    $$('.statusbar-overlay').removeClass('with-panel-left with-panel-right');
});
