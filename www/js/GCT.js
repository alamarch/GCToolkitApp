var DevOrProd = "prod"; //### set this to "dev" to have the api hit the dev environment, anything else for prod. Sorry about the naming convention. Not feeling very creative...

String.prototype.trunc = function(n){
    return this.substr(0,n-1)+(this.length>n?'&hellip;':'');
};

Number.prototype.padLeft = function(base,chr){
   var len = (String(base || 10).length - String(this).length)+1;
   return len > 0? new Array(len).join(chr || '0')+this : this;
}

function isAppleDevice(){
    return (navigator.userAgent.match(/(iPhone|iPod|iPad)/) != null) ? true : false;
}

function prettyDate(date){
    if( isAppleDevice() ){
        var dateParts = date.substring(0,10).split('-');
        var timePart = date.substr(11);
        date = dateParts[1] + '/' + dateParts[2] + '/' + dateParts[0] + ' ' + timePart;
        var d = new Date(Date.parse(date));
        var d2 = new Date(Date.parse(date));
    } else {
        var d = new Date(Date.parse(date));
        var d2 = new Date(Date.parse(date));
    }

    var td = new Date();
    // td.setDate(td.getDate() - 1); //Commented out, why compare to yesterday?

    if (d2.setHours(0, 0, 0, 0) == td.setHours(0, 0, 0, 0)) {
        var hours = ((d.getHours() + 11) % 12 + 1);
        var ampm = (d.getHours() >= 12) ? " PM":" AM";
        var dformat = [hours.padLeft(), d.getMinutes().padLeft()].join(":") + ampm;
    } else if ((addDays(td,-1) + '') === (d2+'')) {
        var dformat = "Yesterday";
    } else {
        var dformat = [(d.getMonth() + 1).padLeft(), d.getDate().padLeft(), d.getFullYear()].join('/');
    }
    return dformat;
}

GCTUser = {
    AppOpen: function () {
        //### Here we have all the preloading functionality for when the app is opened
        //### Such as hit GA with an event, check if user can be auto logged in
        //### Check the tools for any notifications
        //### Check paramters to see if the user open tha app from a notification link etc.
        //### Need to find the framework7s first event for this

        //### Uncomment to reset
        //Cookies.remove('lang');
       // Cookies.remove('apikey');
        //Cookies.remove('email');

        //### This function assumes it's being called from the index page after load
        if (GCTUser.IsLangSet()) {
            if (GCTUser.IsLoggedIn()) {
                //### Check if the key is still valid
                $$.ajax({
                    method: 'POST',
                    dataType: 'json',
                    url: GCT.LoginURL,
                    data: { action: "login", email: GCTUser.Email(), key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
                    timeout: 12000,
                    success: function (data) {
                        if (data.status < 0) {
                            //### Key is invalid, reset it
                            GCTUser.SetAPIKey('');
                            mainView.router.loadPage({ url: 'sign-in.html' });
                        } else {
                            ///### Checks done.
                            GCTUser.SetUserProfile();
                            mainView.router.loadPage({ url: 'home.html' });
                        }
                    },
                    error: function (jqXHR, textStatus, errorThrown) {
                        //### Not good. User is not connected to the internet.
                        //### Down the line we may have offline capability
                        //### For now we don't allow the user to move forward
                        //### Maybe provide a "Check Again" modal?
                        myApp.confirm('It looks like there is no internet connection. Would you like us to check again?', 'No Internet Connection',
                            function () {
                                window.location.reload(true);
                            }
                        );
                        
                    }
                });
            } else {
                mainView.router.loadPage({ url: 'sign-in.html' });
            }
        } else {
            //### Show lang buttons. This is first call and only happens until they click a lang link
            $('#aEN').toggle();
            $('#aFR').toggle();
        }
    },
    IsLoggedIn: function () {
        if (GCTUser.APIKey() == "") {
            return false;
        } else {
            return true;
        }
    },
    SendValidation: function (successCallback, errorCallback) {
        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.LoginURL,
            data: { email: GCTUser.Email(), action: "Activate", lang: GCTUser.Lang()  },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    SendValidationCode: function (Code, successCallback, errorCallback) {
        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.LoginURL,
            data: { email: GCTUser.Email(), action: "CheckCode", code: Code },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    Logout: function (successCallback, errorCallback) {

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.LoginURL,
            data: { action: "logout", email: GCTUser.Email(), key: GCTUser.APIKey() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });

        //GCTUser.SetAPIKey("");
        myApp.closePanel(false);
        mainView.router.loadPage({ url: 'sign-in.html' });
    },
    SetAPIKey: function (key) {
        if (key == "") {
            Cookies.remove('apikey');
        } else {
            Cookies.set('apikey', key, { expires: 100000 });
        }
    },
    APIKey: function () {
        var apikey = Cookies.get('apikey');
        if (typeof apikey != 'undefined') {
            return apikey;
        } else {
            return "";
        }
    },
    LastLoginEmail: function () {

        var email = Cookies.get('email');
        if (email){
            return email;
        }else{
            return "";
        }
    },
    Email: function(){
        //### As currently designed, this will always be the same as LastLoginEmail. I think that makes sense if not we can change the logic.
        return GCTUser.LastLoginEmail();
    },
    SaveLoginEmail: function (txtObj) {
        Cookies.set("email", txtObj, { expires: 100000 });
    },
    PrettyContext: function(){
        //### Check context cookie for gccoonnex otherwise default to gccollab
        if(Cookies.get("context") == "gcconnex")
            return "GCconnex";
        else
            return "GCcollab";
    },
    Context: function(){
        //### Check context cookie for gccoonnex otherwise default to gccollab
        if(Cookies.get("context") == "gcconnex")
            return "gcconnex";
        else
            return "gccollab";
    },
    SetContextAsGCconnex: function(){
        Cookies.set("context", "gcconnex",{ expires: 100000 } );
        location.reload();
    },
    SetContextAsGCcollab: function(){
        Cookies.set("context", "gccollab",{ expires: 100000 } );
        location.reload();
    },
    Lang: function () {
        //### Check Lang cookie for fr, if present return fr else return en
        if (Cookies.get("lang") == 'fr')
            return 'fr';
        else
            return 'en';
    },
    IsEnglish: function () {
        return GCTUser.Lang() == "en";
    },
    SetAsFrench: function () {
        Cookies.set("lang", "fr",{ expires: 100000 } );
    },
    SetAsEnglish: function () {
        Cookies.set("lang", "en", { expires: 100000 } );
    },
    IsLangSet: function () {
        if (typeof Cookies.get("lang") == "undefined") {
            return false;
        } else {
            return true;
        }
    },
    SetUserProfile: function() {
        GCTUser.GetUserProfile(GCTUser.Email(), function(data){
            var profileData = data.result;
            
            $('#imgUserProfilePic').attr('src', profileData.iconURL);
            $('#divUserProfileName').text(profileData.displayName);
            $('#divUserProfileOrg').text(profileData.department);
        }, function(jqXHR, textStatus, errorThrown){
            console.log(jqXHR, textStatus, errorThrown);
        });
    },
    GetUserProfile: function (profile, successCallback, errorCallback) { 
        // if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.ProfileURL,
            data: { user: profile, key: GCTUser.APIKey(), profileemail: profile, environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetUserActivity: function (profile, limit, offset, successCallback, errorCallback) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.useractivity", user: profile, limit: limit, offset: offset, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetUserGroups: function (profile, successCallback, errorCallback) {
        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.usergroups", user: profile, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    ViewPost: function(obj){
        var guid = $(obj).data("guid");
        var type = $(obj).data("type");

        console.log("viewing post " + guid + '-' +  type);

        if( type == "gccollab_wire_post" ){
            GCTUser.GetWire(guid, 1, function(data){
                var wires = data.result.reverse();
                console.log(wires);

                var content = "";
                $(wires).each(function(key, value) {
                    // Removes HTML components from Blog
                    // var text = $(value.description).text();
                    var text = value.description;

                    var replied = (value.replied) ? "active" : "";
                    var liked = (value.liked) ? "active" : "";
                    var likes = (value.likes > 0) ? "<span class='like-count'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

                    content += "<div class='card list-block media-list " + GCTUser.Context() + "'>"
                        + "<ul><li><div class='item-link item-content' onclick='ShowProfile(" + value.owner_guid + ");'>"
                            + "<div class='item-media'><img src='" + value.userDetails.iconURL + "' width='44'/></div>"
                            + "<div class='item-inner'>"
                                + "<div class='item-title-row'>"
                                    + "<div class='author'>" + value.userDetails.displayName + "</div>"
                                + "</div>"
                                + "<div class='time'>" + prettyDate(value.time_created) + "</div>"
                            + "</div>"
                        + "</div></li></ul>"
                        + "<div class='content-block'>"
                            + "<div class='item-text all-text'>" + text + "</div>"
                            + "<div class='row'>"
                                + "<div class='col-100 icons' data-guid='" + value.guid + "' data-type='{type}'><i class='fa fa-2x fa-reply " + replied + "' aria-hidden='true' onclick='GCTUser.ReplyToPost(this);'></i><i class='fa fa-2x fa-share-alt-square' aria-hidden='true' onclick='GCTUser.SharePost(this);'></i><i class='fa fa-2x fa-thumbs-up " + liked + "' aria-hidden='true' onclick='GCTUser.LikePost(this);'></i>" + likes + "</div>"
                            + "</div>"
                        + "</div>"
                    + "</div>";

                    content = content.replace(/{type}/g, "gccollab_wire_post");
                });

                $('#panel-right-content').html(content);
                $('#panel-right-button').data('guid', guid).attr('onclick', "GCTUser.ReplyToPost(this);").text('Reply');
                myApp.openPanel('right');
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
        } else if( type == "gccollab_blog_post" ){
            console.log(GCTUser.Email(), guid);
            GCTUser.GetBlog(guid, function(data){
                var blog = data.result;
                console.log(blog);

                var content = "";
                $(blog).each(function(key, value) {
                    // Removes HTML components from Blog
                    // var text = $(value.description).text();
                    var text = value.description;

                    var replied = (value.replied) ? "active" : "";
                    var liked = (value.liked) ? "active" : "";
                    var likes = (value.likes > 0) ? "<span class='like-count'>" + value.likes + (value.likes == 1 ? " like" : " likes") + "</span>" : "";

                    content += "<div class='card list-block media-list " + GCTUser.Context() + "'>"
                        + "<ul><li><div class='item-link item-content' onclick='ShowProfile(" + value.owner_guid + ");'>"
                            + "<div class='item-media'><img src='" + value.userDetails.iconURL + "' width='44'/></div>"
                            + "<div class='item-inner'>"
                                + "<div class='item-title-row'>"
                                    + "<div class='author'>" + value.title + "</div>"
                                + "</div>"
                                + "<div class='time'>" + prettyDate(value.time_created) + "</div>"
                            + "</div>"
                        + "</div></li></ul>"
                        + "<div class='content-block'>"
                            + "<div class='item-text all-text'>" + text + "</div>"
                            + "<div class='row'>"
                                + "<div class='col-100 icons' data-guid='" + value.guid + "' data-type='{type}'><i class='fa fa-2x fa-reply " + replied + "' aria-hidden='true' onclick='GCTUser.ReplyToPost(this);'></i><i class='fa fa-2x fa-share-alt-square' aria-hidden='true' onclick='GCTUser.SharePost(this);'></i><i class='fa fa-2x fa-thumbs-up " + liked + "' aria-hidden='true' onclick='GCTUser.LikePost(this);'></i>" + likes + "</div>"
                            + "</div>"
                        + "</div>"
                    + "</div>";

                    content = content.replace(/{type}/g, "gccollab_blog_post");
                });

                $('#panel-right-content').html(content);
                $('#panel-right-button').data('guid', guid).attr('onclick', "GCTUser.ViewPost(this);").text('Reply');
                myApp.openPanel('right');
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
        }
    },
    NewWirePost: function(){
        console.log("new wire post");

        myApp.prompt('Share your content for everyone to consult e.g. open events, announcements, etc.', 'New Wire Post', function (value) {
            var message = $(".modal .input-field input[type=text]").val();
            GCTUser.PostWire('', message, function(data){
                console.log(data);
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
            console.log("new wire post: '" + value + "'");
        });
    },
    ReplyToPost: function(obj){
        var guid = $(obj).parent().data("guid");
        var type = $(obj).parent().data("type");

        console.log("reply to " + guid + '-' +  type);

        myApp.prompt('Share your content for everyone to consult e.g. open events, announcements, etc.', 'Reply to Wire Post', function (value) {
            var message = $(".modal .input-field input[type=text]").val();
            GCTUser.PostWire(guid, message, function(data){
                console.log(data);
            }, function(jqXHR, textStatus, errorThrown){
                console.log(jqXHR, textStatus, errorThrown);
            });
            console.log("replying to " + guid + " with '" + value + "'");
        });
    },
    PostWire: function (guid, message, successCallback, errorCallback) { 
        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "reply.wire", user: GCTUser.Email(), guid: guid, message: message, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    LikePost: function (obj) {
        var guid = $(obj).parent().data("guid");
        var type = $(obj).parent().data("type");

        console.log("like " + guid + '-' +  type);

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "like.item", user: GCTUser.Email(), guid: guid, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                console.log(data);

                var count = data.result.count;
                var liked = data.result.liked;

                if( $(obj).hasClass('active') && !liked ){
                    $(obj).removeClass('active');
                } else if( liked ){
                    $(obj).addClass('active');
                }

                var text = (count == 1) ? count + " like" : count + " likes";
                $(obj).next('.like-count').text(text);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
    SharePost: function(obj){
        var guid = $(obj).parent().data("guid");
        var type = $(obj).parent().data("type");

        console.log("share " + guid + '-' +  type);

        myApp.prompt('Share this post with others:', 'Share', function (value) {
            console.log("shareing " + guid + " with '" + value + "'");
        });
    },
    GetBlog: function (guid, successCallback, errorCallback) {
        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.blogpost", user: GCTUser.Email(), guid: guid, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetBlogs: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.userposts", type: "blog", user: GCTUser.Email(), limit: limit, offset: offset, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    NewBlogPost: function(){
        console.log("new blog post");

        myApp.prompt('Share your content for everyone to consult e.g. open events, announcements, etc.', 'New Blog Post', function (value) {
            console.log("new blog post: '" + value + "'");
        });
    },
    GetGroup: function (guid, successCallback, errorCallback) {
        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.group", user: GCTUser.Email(), guid: guid, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetGroups: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.groups", user: GCTUser.Email(), limit: limit, offset: offset, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    NewGroup: function(){
        console.log("new group");

        myApp.prompt('Share your content for everyone to consult e.g. open events, announcements, etc.', 'New Group', function (value) {
            console.log("new group: '" + value + "'");
        });
    },
    GetWire: function (guid, thread, successCallback, errorCallback) {
        thread = thread || 0;

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.wirepost", user: GCTUser.Email(), guid: guid, thread: thread, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWires: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.userposts", type: "wire", user: GCTUser.Email(), limit: limit, offset: offset, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWiresByUserColleague: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.usercolleagueposts", type: "wire", user: GCTUser.Email(), limit: limit, offset: offset, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetWiresByUser: function (profile, limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        if (typeof profile == 'undefined')
            profile = GCTUser.Email(); //### Get current users profile

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.wireposts", user: GCTUser.Email(), profileemail: profile, limit: limit, offset: offset, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetDiscussions: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.userposts", type: "discussion", user: GCTUser.Email(), limit: limit, offset: offset, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetNewsfeed: function (limit, offset, successCallback, errorCallback) {
        limit = limit || 10;
        offset = offset || 0;

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "get.userposts", type: "newsfeed", user: GCTUser.Email(), limit: limit, offset: offset, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetLikes: function (guid, successCallback, errorCallback) {
        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "like.count", user: GCTUser.Email(), guid: guid, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                successCallback(data);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                errorCallback(jqXHR, textStatus, errorThrown);
            }
        });
    },
    GetLikeUsers: function(obj){
        var guid = $(obj).parent().data("guid");
        var type = $(obj).parent().data("type");

        console.log("getting like users for " + guid + '-' +  type);

        $$.ajax({
            method: 'POST',
            dataType: 'json',
            url: GCT.APIURL,
            data: { method: "like.users", user: GCTUser.Email(), guid: guid, key: GCTUser.APIKey(), environment: DevOrProd, context: GCTUser.Context() },
            timeout: 12000,
            success: function (data) {
                var likeData = data.result;
                console.log(likeData);

                var content = '';
                $.each(likeData.users, function (key, value) {
                    content += "<div class='swiper-slide card list-block media-list'>"
                        + "<ul><li><a class='item-link item-content' onclick='ShowProfile(" + value.user_id + ");'>"
                            + "<div class='item-media'><img src='" + value.iconURL + "' /></div>"
                            + "<div class='item-inner'>"
                                + "<div class='item-title-row'>"
                                    + "<div class='author'>" + value.displayName + "</div>"
                                + "</div>"
                                + "<div class='time'>" + prettyDate(value.time_created) + "</div>"
                            + "</div>"
                        + "</a></li></ul>"
                    + "</div>";
                });

                $('#panel-right-content').html(content);
                $('#panel-right-button').data('guid', '').attr('onclick', "").text('Close');
                myApp.openPanel('right');
            },
            error: function (jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            }
        });
    },
}

GCT = {
    LoginURL: "https://api.gctools.ca/login.ashx", // Post username and password, returns key if valid login
    ProfileURL: "https://api.gctools.ca/profile.ashx",
    GCconnexURL: "",
    GCpediaURL: "",
    GCcollabURL: "",
    APIURL: "https://api.gctools.ca/a.ashx"
}

GCTLang = {
 
    TranslatePageContents: function (body) {
        //### This will translate page contents and should be run on each and every page load
        //### Not sure if this is the best way yet, but devices are so quick nowadays that we could easily run on every page load
        //### it simply loops through all elements and checks for a data-lange or data-langf and sets the text accordingly.
        //### Again, something we should look at to see if it slows anything down.
        //### Primarily this is done on each page load because if the user toggles language. Not sure about this method though.
        if (body) {
            //### Loop "body" elements
        } else {
            //### Loop entire document elements
        }
    }
}