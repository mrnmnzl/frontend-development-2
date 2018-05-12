const choo = require('choo');
const html = require('choo/html');
const emoji = require('node-emoji');
const css = require('sheetify');
const app = choo();

css('bootstrap');

const styles = css`
  h1 {
    margin: 10px 30px;
  }

  .input-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    height: 60px;
    
    padding: 0 30px;
  }

  #exampleFormControlSelect1 {
    width: 200px;
    margin-top: 16px;
  }

  .content {
    margin-left: 30px;
    font-size: 40px;
  }
`;

const wagon = 'railway_car';
const train = 'steam_locomotive';
const track = 'railway_track';
const factory = 'factory';
const a = 'a';
const b = 'b';
const options = [
  {value: 'none', text: 'Choose track...'},
  {value: 'a', text: 'Track A'},
  {value: 'b', text: 'Track B'}
];

app.model({
  state: {
    wagons: [],
    trains: [train, train, train, train],
    trackA: [],
    trackB: [],
    btnDisabled: true,
    selectedTrack: 'none',
  },

  reducers: {
    addWagon: (data, state) => { 
      let newWagons = [];

      if (state.wagons.length <= 9) {
        newWagons = [...state.wagons, wagon];
      } else {
        newWagons = [...state.wagons];
      }

      return Object.assign(state, {
        wagons: newWagons
      });
    },

    moveWagonA: (data, state) => {
      const add = [];
      const track = state.selectedTrack;

      if (state.trackA.length === 0) {
        //Add train to track if available
        if(state.trains.length > 0) {
          state.trains.pop();
          add.push(train);
        }
      }

      if (state.trackA.length > 0 && state.trackA.length <= 4) {
        //Add wagon if available and if a train is available
        if(state.wagons.length >= 1) {
          state.wagons.pop();
          add.push(wagon);
        }
      }

      //Always check button state
      let btn = true;
      if (track === 'a' && state.trackA.length === 5) {
        btn = false;
      } else if (track === 'b' && state.trackB.length === 6) {
        btn = false;
      }

      return Object.assign(state, {
        btnDisabled: btn,
        wagons: state.wagons,
        trackA: [...state.trackA, ...add]
      });
    },

    moveWagonB: (data, state) => {
      const add = [];
      const track = state.selectedTrack;

      if (state.trackB.length === 0) {
        //Zug hinzufügen, wenn verfügbar
        if(state.trains.length > 0) {
          state.trains.pop();
          add.push(train);
        }
      }

      if (state.trackB.length > 0 && state.trackB.length <= 5) {
        //Wagon hinzufügen, wenn verfügbar
        if(state.wagons.length >= 1) {
          state.wagons.pop();
          add.push(wagon);
        }
      }

      //Always check button state
      let btn = true;
      if(state.selectedTrack === 'a' && state.trackA.length === 5) {
        btn = false;
      }else if (track === 'b' && state.trackB.length === 6) {
        btn = false;
      }

      return Object.assign(state, {
        btnDisabled: btn,
        wagons: state.wagons,
        trackB: [...state.trackB, ...add]
      });
    },

    checkTrain: (data, state) => {
      const track = data.track;
      let option = 'none';
      let btn = true;
      if(track === 'a') {
        option = track;
        if (state.trackA.length === 5) {
          btn = false;
        }
      } else if (track === 'b') {
        option = track;
        if (state.trackB.length === 6) {
          btn = false;
        }
      }
      
      return Object.assign(state, {
        selectedTrack: track,
        btnDisabled: btn
      });
    },

    scheduleTrain: (data, state) => {
      const track = data.track;
      let trackA = [];
      let trackB = [];

      if(track === 'a') trackB = state.trackB; //Track B bleibt gleich
      else trackA = state.trackA; //Track A bleibt gleich 

      return Object.assign(state, {
        btnDisabled: true,
        trackA: trackA,
        trackB: trackB,
        trains: [...state.trains]
      });
    }
  }
});


const mainView = (state, prev, send) => { 
  return html`
  <main class=${styles}>
    <h1>Rangierbahnhof</h1>
    <hr>
    <div class="input-container">
      <button onclick=${() => send('addWagon')} class="btn btn-info">Waggon kaufen</button>
      <button onclick=${() => send('moveWagonA')} class="btn btn-info">Gleis A Rangieren</button>
      <button onclick=${() => send('moveWagonB')} class="btn btn-info">Gleis B Rangieren</button>
      <div class="form-group">
        <select onchange=${handleChange} class="form-control" id="exampleFormControlSelect1" selected=${state.selectedOption}>
          ${options.map(option => {
            return html`<option value=${option.value} ${state.selectedTrack === option.value ? 'selected' : ''} > ${option.text} </option>`
          })}
        </select>
        </div>
        <button id="submit" onclick=${handleSchedule} class="btn btn-info" disabled=${state.btnDisabled}>Zug losschicken</button>
    </div>
    <div class="content abstellgleis-wagons">
      ${emoji.get(factory)}
      ${state.wagons.map((v) => emoji.get(v))}
    </div>
    <div class="content abstellgleis-trains">
      ${emoji.get(factory)}
      ${state.trains.map((v) => emoji.get(v))}
    </div>
    <div class="content gleis-a">
      ${emoji.get(a)}
      ${emoji.get(track)}
      ${state.trackA.map((v) => emoji.get(v))}
    </div>
    <div class="content gleis-b">
      ${emoji.get(b)}
      ${emoji.get(track)}
      ${state.trackB.map((v) => emoji.get(v))}
  </div>
  </main>`

  function handleChange (e) {
    const val = e.target.value;
    if (val === 'a' || val === 'b') {
      send('checkTrain', {track: val});
    }
  }

  function handleSchedule() {
    const ref = document.getElementById('exampleFormControlSelect1');
    const val = ref.options[ref.selectedIndex].value;
    if (val === 'a' || val === 'b') {
      send('scheduleTrain', {track: val});
    }
  }
}

app.router((route) => [route('/', mainView)]);

const tree = app.start();
document.body.appendChild(tree);
