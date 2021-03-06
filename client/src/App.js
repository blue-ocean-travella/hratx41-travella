import React, { Component } from "react";
import fetch from "node-fetch";
import Axios from "axios";
// import './App.css

const apiKey = process.env.API_KEY;

import Script from "react-load-script";

export default class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      city: "",
      nightLife: [],
      restaurants: [],
      thingsToDo: [],
      dayTrips: [],
      topSpots: []
    };

    this.HandleScriptLoad = this.HandleScriptLoad.bind(this);
    this.HandlePlaceSelect = this.HandlePlaceSelect.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.Initialize = this.Initialize.bind(this);
    this.getDetails = this.getDetails.bind(this);
  }

  Initialize() {
    Axios.get("/location", {
      params: {
        city: this.state.city,
        latitude: this.state.latitude,
        longitude: this.state.longitude
      }
    })
      .then(data => {
        console.log("how data is sent from server", data.data);
        let nightLife = data.data.nightLife;
        let dayTrips = data.data.dayTrips;
        let restaurants = data.data.restaurants;
        let thingsToDo = data.data.thingsToDo;
        let topSpots = data.data.topSpots;

        this.setState({ nightLife: nightLife });
        this.setState({ dayTrips: dayTrips });
        this.setState({ restaurants: restaurants });
        this.setState({ thingsToDo: thingsToDo });
        this.setState({ topSpots: topSpots });
      })

      .then(() =>
        console.log(
          "this is state",
          this.state,
          "hel",
          this.state.nightLife[0].photos
        )
      )
      .catch(err => console.log(err));
  }

  handleKeyDown(e) {
    if (e.key === "Enter") {
      this.Initialize();
    }
  }

  HandleScriptLoad() {
    // Declare Options For Autocomplete
    var options = {
      types: ["(regions)"]
    }; // To disable any eslint 'google not defined' errors

    // Initialize Google Autocomplete
    /*global google*/ this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById("autocomplete"),
      options
    );

    // Fire Event when a suggested name is selected
    this.autocomplete.addListener("place_changed", this.HandlePlaceSelect);
  }

  HandlePlaceSelect() {
    // Extract City From Address Object
    let addressObject = this.autocomplete.getPlace();
    let address = addressObject.address_components;
    // document.getElementById(
    //   "cityLat"
    // ).value = addressObject.geometry.location.lat();
    // document.getElementById(
    //   "cityLng"
    // ).value = addressObject.geometry.location.lng();
    // let lat = addressObject.geometry.location.lat();
    // let long = addressObject.geometry.location.lng();

    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          city: address[0].long_name
        },
        this.Initialize
      );
    }
  }

  getDetails(array) {
    array.map(x => {
      Axios.get("/location/details", {
        params: {
          placeId: x.place_id
        }
      })
        .then(data => {
          const result = data.data.result;
          let photoData = result.photos;
          let openNowData = result.opening_hours.open_now;
          let operatingData = result.opening_hours.weekday_text;
          let priceData = result.price_level;
          let typeData = result.types;
          let website = result.website;
          let phoneNumber = result.formatted_phone_number;

          //console.log("does this exits?", photoData);
          let photos = [];
          photoData.map(x => {
            photos.push(
              `https://maps.googleapis.com/maps/api/place/photo?maxwidth=1200&photoreference=${
                x.photo_reference
              }&key=${apiKey}`
            );
          });
          x.photos = photos;
          x.hoursOfOperation = operatingData;
          x.openOrNot = openNowData;
          x.priceLevel = priceData;
          x.type = typeData;
          x.websiteUrl = website;
          x.phoneNumber = phoneNumber;
        })
        .catch(err => console.log(err));
    });
  }

  render() {
    return (
      <div>
        <h1>Welcome to Blue Ocean!</h1>
        <div>
          <Script
            url={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`}
            onLoad={this.HandleScriptLoad}
            onClick={this.Initialize}
          />
          <input
            id="autocomplete"
            style={{
              margin: "0 auto",
              maxWidth: 800
            }}
            onKeyDown={this.handleKeyDown}
          />
          <input type="hidden" id="cityLat" name="cityLat" />
          <input type="hidden" id="cityLng" name="cityLng" />
        </div>
        <div>
          <input
            type="text"
            id="throwAway"
            onKeyDown={this.handlePlaceDetail}
          />
        </div>
      </div>
    );
  }
}
