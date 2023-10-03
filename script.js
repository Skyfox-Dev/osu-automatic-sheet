var accessToken = getClientCredentialsToken("add your", "osu apiv2 credentials");

function getClientCredentialsToken(clientid, clientsecret) {
  var url = "https://osu.ppy.sh/oauth/token";
  var payload = {
    client_id: clientid,
    client_secret: clientsecret,
    grant_type: "client_credentials",
    scope: "public"
  };
  var options = {
    method: "post",
    contentType: "application/x-www-form-urlencoded",
    payload: payload,
    muteHttpExceptions: true
  };
  var response = UrlFetchApp.fetch(url, options,);
  var data = JSON.parse(response.getContentText());
  return data.access_token;
}


function getUserIcon(userId) {
  var url = "https://osu.ppy.sh/api/v2/users/" + userId + "/osu";
  var options = {
    muteHttpExceptions: true,
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  return data.avatar_url;
}

function getUserRank(userId) {
  var url = "https://osu.ppy.sh/api/v2/users/" + userId + "/mania";
  var options = {
    muteHttpExceptions: true,
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  return data.statistics.variants.find(variant => variant.variant === '4k').global_rank;
} 

function getUserName(userId) {
   var url = "https://osu.ppy.sh/api/v2/users/" + userId + "/mania";
  var options = {
    muteHttpExceptions: true,
    headers: {
      "Authorization": "Bearer " + accessToken
    }
  };
  var response = UrlFetchApp.fetch(url, options);
  var data = JSON.parse(response.getContentText());
  return data.username;
}