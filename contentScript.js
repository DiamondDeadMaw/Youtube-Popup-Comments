key = 'AIzaSyAw_zjwl3AdXWuUnJ2NpcShp6g2TW2P5so';
var url = window.location.href;
url = url.slice(url.indexOf('=') +1);
var maxComments = 100;
apiURL = `https://www.googleapis.com/youtube/v3/commentThreads?key=${key}&textFormat=plainText&part=snippet&videoId=${url}&maxResults=${maxComments}&order=relevance`;

document.addEventListener("fullscreenchange", function () {
    if (document.fullscreen) {
        html_code = `<button class="customButtonsForComments" id="customButtonForComments" title="See Comments">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="38" height="31" viewBox="0 0 38 31">
        <metadata><?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
      <x:xmpmeta xmlns:x="adobe:ns:meta/" x:xmptk="Adobe XMP Core 5.6-c138 79.159824, 2016/09/14-01:09:01        ">
         <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
            <rdf:Description rdf:about=""/>
         </rdf:RDF>
      </x:xmpmeta>                              
      <?xpacket end="w"?></metadata>
      <image id="Layer_0" data-name="Layer 0" x="1" width="38" height="31" xlink:href="data:img/png;base64,iVBORw0KGgoAAAANSUhEUgAAACYAAAAfCAQAAAAhQXdAAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAAAAmJLR0QAAKqNIzIAAAAJcEhZcwAACxIAAAsSAdLdfvwAAAAHdElNRQflCA8XFwD+pEplAAACbklEQVRIx+2WPUwUQRTHfzu7t8feXRABUYGICDaEBmNCLDQhsTDRoLaHgsHGj2hFh7EwGjSEGAtaEws+TCi0sdDCwgq11aiJmogXT/CL8744budZ7Hl3JAfiHZXxP8nM2392/m/evMm8QRBs9iqhvHawIZCfi3B28GkmI+VhSd66M9Ez/X4EG5rb3pcpVEBUWjoFQV0YbaZSbOH0EIBq67YqFlPs3AegvkQq1gI21QKoxtaNEEsmAFQisRFits8LdwPxX+xfErOat3pGtzmrf5N9TAj81FPmY2NKAMKGlJw+JQjgdVhzn2kBcEzyYvMmgN+Yr56OTWOgmSytRdiYLA4zGPSMrFsgO7QGbONSzHOsMADyvdcA3BVOrMVv1AMcsknfxsY1BuRW7pc7uwbewWgPhnYuP/RvHqnlFYxsN7eZbapj/Mp5uhpXLPTB97UvPndd1+NMRBCU67Im/ibdVmSOOtA8ex6qCVQbSmvRpiU6nVTKHwA3KyynU3HY0wmQ5eXr2EL9DtN0XdPUrjJ3N+XVxh6JiCxLb1Wh4pwrUYV6QzdOZkUkLoNNQphwjn/zsShM5QOwaFgCJ+dgvEQI9+O2YwJB5qIwwUSOd0K5UYGqyS3yg4LUGvthk4kBaBICdp6PL3pjSoMVeUE7wIFj17QdCtQlv64UMS03qyzTd/VT0xMvIUf7bjpjgetRy3FTpnNYF04gF4ezIqL/mHxXfmRXPywjdwWB9q75iovwgvTvzz0PTh25t5AsWygus5mh4YASqhSCELJ6nB7fep8qJ1Z8HW8NWZ7lx7BZym+2v8heHUGV0FBFuojz41Ou/gXw1ZY+PIGFRAAAAABJRU5ErkJggg=="/>
      </svg>
      </button>`
        if (document.getElementsByClassName("customButtonsForComments").length == 0) {
            p_Element = document.getElementsByClassName("ytp-chrome-top-buttons");
        for (i = 0; i < p_Element.length; i++) {
            ele = p_Element[i];
            ele.insertAdjacentHTML('afterbegin', html_code);
        }
        buttons = document.getElementsByClassName("customButtonsForComments");
        for (i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener("click", onButtonClick, false);
        }
        }
    } else {    //going from fullscreen to normal
        p_Element = document.getElementsByClassName("ytp-chrome-top-buttons"); 
        for (i = 0; i < p_Element.length; i++) {
            ele = p_Element[i];
            ele.removeChild(document.getElementById("customButtonForComments"));
        }
        //deleting the popup window
        if (document.getElementsByClassName("popUpComments").length > 0) {
            element = document.getElementsByClassName("popUpComments")[0];
            element.remove();
        }
    }
});
var mouseInElement = false;
var comments = [];
function onButtonClick() {
    if (document.getElementsByClassName("popUpComments").length > 0) {
        commentElement = document.getElementsByClassName("popUpComments")[0];
        commentElement.remove();
    } else {
        popupComments ='<div class="popUpComments">'
        //now adding html elements one by one
        fetch(apiURL)
      .then(response => response.text())
      .then(data => {
          data = JSON.parse(data);
        for (i = 0; i< data.items.length; i++) {
            try {
                commentData = data.items[i].snippet.topLevelComment;
            } catch(e) {
                console.log('Error getting comment data');
            }
    
            commentText = commentData.snippet.textDisplay;
            authorName = commentData.snippet.authorDisplayName;
            authorProfilePic = commentData.snippet.authorProfileImageUrl;
            channelURL = commentData.snippet.authorChannelUrl;
            likeCount = commentData.snippet.likeCount.toString();
            likeCountNum = Number(likeCount);
            finalLikeCount = likeCount;
            if (likeCountNum > 1000){
                if (likeCountNum < 10000) {
                    secondDigit = Math.round(Number(likeCount.charAt(1) + "." + likeCount.charAt(2)));
                if (secondDigit.toString().length > 1) {
                    finalLikeCount = (Number(likeCount.charAt(0)) + 1).toString()+"k";
                } else {
                    finalLikeCount = likeCount.charAt(0) + "." + secondDigit+"k";
                }
                } else if (likeCountNum < 100000) {
                    finalLikeCount = Math.round(Number(likeCount.charAt(0) + likeCount.charAt(1) + "." + likeCount.charAt(2))).toString() + "k";
                } else if (likeCountNum < 1000000) {
                    finalLikeCount = Math.round(Number(likeCount.charAt(0) + likeCount.charAt(1) + likeCount.charAt(2) + "." + likeCount.charAt(3))).toString() + "k";
                } else if (likeCountNum < 10000000) {
                    //less than 10 million
                    finalLikeCount = Math.round(Number(likeCount.charAt(0) + "." + likeCount.charAt(1))).toString() + "m";
                } else if (likeCountNum < 100000000) {
                    finalLikeCount = Math.round(Number(likeCount.charAt(0) + likeCount.charAt(1) + "." + likeCount(2))).toString() + "m";
                }
            }
            //adding new row
            popupComments += `
            <div class=popUpCommentsRow commentElement>
        <div class="leftColumn commentElement">
            <img class="profilePic commentElement"
            src="${authorProfilePic}">
            <div class="likeInfo commentElement">
                <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" focusable="false"
            style="pointer-events: none; display: block;" class="likeButton">
            <g class="style-scope yt-icon commentElement">
                <path fill="#C5C5C5"
                    d="M1 21h4V9H1v12zm22-11c0-1.1-.9-2-2-2h-6.31l.95-4.57.03-.32c0-.41-.17-.79-.44-1.06L14.17 1 7.59 7.59C7.22 7.95 7 8.45 7 9v10c0 1.1.9 2 2 2h9c.83 0 1.54-.5 1.84-1.22l3.02-7.05c.09-.23.14-.47.14-.73v-1.91l-.01-.01L23 10z"
                    class="style-scope yt-icon"></path>
            </g>
        </svg>
        <p class="likeNumber commentElement">${finalLikeCount}</p>
            </div>
        </div>
        <div class="rightColumn commentElement">
            <a class="authorName commentElement" href="${channelURL}"><b>${authorName}</b></a>
            <p class="commentText commentElement">${commentText}</p>
        </div>
    </div>
            `
        }
        popupComments += '</div>';
        document.getElementsByClassName('ytp-chrome-top')[0].insertAdjacentHTML('afterend', popupComments);
        elements = document.getElementsByClassName("commentElement");
        for (i = 0; i< elements.length; i++) {
            elements[i].addEventListener("mouseenter", function() { mouseInElement = true; console.log("Enterer");})
            elements[i].addEventListener("mouseout", function() { mouseInElement = false; console.log("Exited");})
        }
      });
    }
}

//checking for changes in the visibility of HUD
var video = document.querySelector("#movie_player");
var lastState = video.classList.contains('ytp-autohide');
var observer = new MutationObserver(function(mutations) {
                    mutations.forEach(function(mutation) {
                        if(mutation.attributeName == "class"){
                            var currentState = mutation.target.classList.contains('ytp-autohide');
                            if(lastState !== currentState)    {
                                lastState = currentState;
                                if(currentState) {
                                    document.getElementById("customButtonForComments").style.visibility = "hidden";
                                    if (!mouseInElement) {
                                        document.getElementsByClassName("popUpComments")[0].style.visibility = "hidden";
                                    }
                                }
                                else{
                                    document.getElementById("customButtonForComments").style.visibility="visible";
                                    document.getElementsByClassName("popUpComments")[0].style.visibility = "visible";
                                }
                            }
                        }
                    });
                });
observer.observe(video, {attributes: true});