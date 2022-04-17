import React, { useEffect, useState } from "react";
import { useSpeechContext } from "@speechly/react-client";
import {
  PushToTalkButton,
  BigTranscript,
  IntroPopup
} from "@speechly/react-ui";
import "./App.css";
import { VoiceInput,VoiceDatePicker } from '@speechly/react-voice-forms'
import '@speechly/react-voice-forms/css/theme/mui.css'


function App() {
  const { segment } = useSpeechContext()
  const [data, setData] = useState({ 
    name: "",
    street_address: "",
    email_address: "",
    phone_number: "",
    dob: ""
  });

  const handleChange = (e, key) => setData({ ...data, [key]: e.target.value});


  useEffect(() => {
    if (segment) {
      if(segment.entities) {
        segment.entities.forEach(entity => {
          console.log(entity.type, entity.value);
          setData(data => ({ ...data, [entity.type]: entity.value}));
        });
      }
      if (segment.isFinal) {
        if(segment.entities) {
          segment.entities.forEach(entity => {
            console.log('✅', entity.type, entity.value)
            setData(data => ({ ...data, [entity.type]: entity.value}))
          });
        }
      }
    }
  }, [segment]);

  return (
    <div className="App">
      <BigTranscript placement="top"/>
      <PushToTalkButton placement="bottom" captureKey=" " powerOn="auto" />
      <IntroPopup />
      <div className="Form">
      <h1>Contact form</h1>
        <div className="Form_group">
          <label>Name</label>
          <VoiceInput 
          changeOnEntityType={data.name}
          value={data.name}
          onChange={e => handleChange(e, "name")}
           />
        </div>
        <div className="Form_group">
          <label>Street address</label>
          <VoiceInput 
          changeOnEntityType={data.street_address}
          value={data.street_address}
          onChange={e => handleChange(e, "street_address")}
           />
        </div>
        <div className="Form_group">
          <label>Email</label>
          <VoiceInput 
          changeOnEntityType={data.email_address}
          value={data.email_address}
          onChange={e => handleChange(e, "email_address")}
          />
        </div>
        <div className="Form_group">
          <label>Phone number</label>
          <VoiceInput 
          changeOnEntityType={data.phone_number} 
          value={data.phone_number}
          onChange={e => handleChange(e, "phone_number")}
          />
        </div>
        <div className="Form_group">
          <label>Date of birth</label>
          <VoiceDatePicker
            changeOnEntityType={data.dob}
            value={data.dob}
            type='date'
            onChange={e => handleChange(e, "dob")}
          />
          {/* <input
            value={data.dob}
            onChange={e => handleChange(e, "dob")}
            type="date"
          /> */}
        </div>
      </div>
    </div>
  );
}

export default App;