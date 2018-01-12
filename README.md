iFrame Sendmessage
=================

What is the problem?
--------------------

Most of the externally-hosted content is delivered to us in iframes.
iframes have their good points and their bad points. Good points include:
* They act as a sandbox to potentially unsafe content
* We mostly (from a development point of view) don't care what is in them
* Content easily included without messing around with nasty Javascript

The sandboxing principle is especially important to us as the Twenty API for Mobiles creates
Progressive Web Apps. If we didn't sandbox third party content, we would quickly run into
problems garbage collecting - leading to unexpected behaviours, layouts and probably
device or browser crashes.
However, sometimes we want to accept a degree of communication between the third party content
and the Twenty API. This might include trusted content triggering tracking behaviour,
allowing the user to log in, or even loading a different page without having to reload the
window.
We will consider all use cases on a request-by-request basis, but mostly we want to be helpful
and inter-action between third party content and the Twenty API can be

Talk to us
----------

If your content is going to be included in any of the Tamedia publications generated by the
Twenty API, we need to explicity code your for your requirements and whitelist your domain.

Talk to your Product Manager, sales contact or other representative at Tamedia.
They should know who to talk to. If they don't, ask them to send an email to dnd-it@tamedia.ch
and to include "WebClients Team" somewhere in the subject line.


How to use this script
----------------------

Once we've set up communication and added your requirements, include the script provided
set up your page as follows.


Include the file sendmessage_send.js in the iframe and include the sendessage_receive.js
in the parent window. Set the class "sendmessage" on iframes which are going to communicate
with Twenty.

For most purposes, that is, for third party providers supplying content to Tamedia
publications, we already have the _receive_ code built into the API and you only need to
ensure that you have the _send_ script included in the head of your HTML page.

You can then send a message either directly after placing the script tag, or programatically
by building the payload yourself as a response to a user event.

Send the message like this:

```
TwentyWindow.send({
        "type": "sendmessage",
        "domain": "https://m.20min.ch:80",
        "message": "triggerlogin"
});
``
*Type*
Exactly equal to "sendmessage"

*Domain*

For security, we expect this to include the HTML5 triple check location of where the iframe
content will be hosted. This is not the same as the `origin` check that we also perform, and
is  required.
HTML5 domain triple check location is a string of the full domain including protocol,
server and port.
In this example set, none of the following is equivalent (they are all different), and
none of them is valid
```
20min.ch
www.20min.ch
http://www.20min.ch
http://m.20min.ch
https://m.20min.ch
www.20min.ch:80
m.20min.ch:80
```
All of the following set are valid. None of them is equivalent:
```
http://www.20min.ch:80
http://www.20minuten.ch:80
http://m.20minuten.ch:80
https://www.20minuten.ch:80
https://m.20min.ch:80
https://m.20minuten.ch:8000
```

*Message*
The message that you agree with us!



Browser compatibility
---------------------

* Internet Explorer 8 and higher
* Microsoft Edge
* All other modern browsers - Mobile and Desktop