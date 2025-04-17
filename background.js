// background.js

const headerProfiles = [
    {
        "User-Agent":               "FakeUA‑A/1.1",
        "Accept-Language":          "de-DE,de;q=1.9",
        "DNT":                      "1",
        "Sec-CH-UA":                "\"Chromium\";v=\"110\", \"Not A;Brand\";v=\"99\"",
        "Sec-CH-UA-Arch":           "\"x86\"",
        "Sec-CH-UA-Model":          "\"\"",
        "Sec-CH-UA-Platform":       "\"Windows\"",
        "Sec-CH-UA-Platform-Version":"\"10.1.0\"",
        "Sec-CH-UA-Bitness":        "\"64\"",
        "Sec-CH-UA-Form-Factors":   "\"Desktop\"",
        "Sec-CH-UA-Full-Version-List":
           "\"Chromium\";v=\"120.1.6128.0\", \"Not A;Brand\";v=\"99.0\""
    },
    {
        "User-Agent":               "FakeUA‑A/1.0",
        "Accept-Language":          "de-DE,de;q=0.9",
        "DNT":                      "1",
        "Sec-CH-UA":                "\"Chromium\";v=\"120\", \"Not A;Brand\";v=\"99\"",
        "Sec-CH-UA-Arch":           "\"x86\"",
        "Sec-CH-UA-Model":          "\"\"",
        "Sec-CH-UA-Platform":       "\"Windows\"",
        "Sec-CH-UA-Platform-Version":"\"10.0.0\"",
        "Sec-CH-UA-Bitness":        "\"64\"",
        "Sec-CH-UA-Form-Factors":   "\"Desktop\"",
        "Sec-CH-UA-Full-Version-List":
           "\"Chromium\";v=\"120.0.6128.0\", \"Not A;Brand\";v=\"99.0\""
      },
      {
        "User-Agent":               "FakeUA‑A/1.2",
        "Accept-Language":          "de-DE,de;q=0.9",
        "DNT":                      "1",
        "Sec-CH-UA":                "\"Chromium\";v=\"130\", \"Not A;Brand\";v=\"99\"",
        "Sec-CH-UA-Arch":           "\"x86\"",
        "Sec-CH-UA-Model":          "\"\"",
        "Sec-CH-UA-Platform":       "\"Windows\"",
        "Sec-CH-UA-Platform-Version":"\"10.0.0\"",
        "Sec-CH-UA-Bitness":        "\"64\"",
        "Sec-CH-UA-Form-Factors":   "\"Desktop\"",
        "Sec-CH-UA-Full-Version-List":
           "\"Chromium\";v=\"120.0.6128.0\", \"Not A;Brand\";v=\"99.0\""
      },
      {
        "User-Agent":               "FakeUA‑A/1.3",
        "Accept-Language":          "de-DE,de;q=0.9",
        "DNT":                      "1",
        "Sec-CH-UA":                "\"Chromium\";v=\"140\", \"Not A;Brand\";v=\"99\"",
        "Sec-CH-UA-Arch":           "\"x86\"",
        "Sec-CH-UA-Model":          "\"\"",
        "Sec-CH-UA-Platform":       "\"Windows\"",
        "Sec-CH-UA-Platform-Version":"\"10.0.0\"",
        "Sec-CH-UA-Bitness":        "\"64\"",
        "Sec-CH-UA-Form-Factors":   "\"Desktop\"",
        "Sec-CH-UA-Full-Version-List":
           "\"Chromium\";v=\"120.0.6128.0\", \"Not A;Brand\";v=\"99.0\""
      },
      {
        "User-Agent":               "FakeUA‑A/1.4", //Test
        "Accept-Language":          "de-DE,de;q=0.9",
        "DNT":                      "1",
        "Sec-CH-UA":                "\"Chromium\";v=\"150\", \"Not A;Brand\";v=\"99\"",
        "Sec-CH-UA-Arch":           "\"x86\"",
        "Sec-CH-UA-Model":          "\"\"",
        "Sec-CH-UA-Platform":       "\"Windows\"",
        "Sec-CH-UA-Platform-Version":"\"10.0.0\"",
        "Sec-CH-UA-Bitness":        "\"64\"",
        "Sec-CH-UA-Form-Factors":   "\"Desktop\"",
        "Sec-CH-UA-Full-Version-List":
           "\"Chromium\";v=\"120.0.6128.0\", \"Not A;Brand\";v=\"99.0\""
      },
  ];
  
  function setRandomHeaderRule() {
    const profile = headerProfiles[Math.floor(Math.random()*headerProfiles.length)];
  
    const modifyAction = {
      type: "modifyHeaders",
      requestHeaders: Object.entries(profile).map(([name, value])=>({
        header: name,
        operation: "set",
        value
      }))
    };
  
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: [1],
      addRules: [{
        id: 1,
        priority: 1,
        action: modifyAction,
        condition: {
          urlFilter: "*",
          resourceTypes: ["main_frame"]
        }
      }]
    });
  }
  
  // Gleich beim Service‑Worker‑Start einmal setzen,
  // damit schon die allererste Navigation geregelt ist:
  setRandomHeaderRule();
  
  // Bei jeder neuen Navigation ebenfalls nachziehen:
  chrome.webNavigation.onBeforeNavigate.addListener(details => {
    setRandomHeaderRule();
  }, {url: [{schemes: ["http","https"]}]});
  