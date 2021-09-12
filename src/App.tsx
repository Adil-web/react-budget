import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { wallet, barChart, home, person } from 'ionicons/icons';
import Main from './pages/Main';
import Tab2 from './pages/Tab2';
import Tab3 from './pages/Tab3';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

import { useState } from 'react';
import AddTransaction from './pages/main/AddTransaction';
import Transactions from './pages/main/Transactions';
import UserSettings from './pages/main/UserSettings';
import Profile from './pages/Profile';

const App: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("Main")

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs
          onIonTabsDidChange={(e) => setCurrentTab(e.detail.tab)}>
          <IonRouterOutlet>
              <Route exact path="/main">
                <Main />
              </Route>
              <Route path="/add">
                <AddTransaction />
              </Route>
              <Route path="/transactions">
                <Transactions />
              </Route>
              <Route path="/user">
                <UserSettings />
              </Route>
              {/* <Route exact path="/tab2">
                <Tab2 />
              </Route> */}
              <Route exact path="/tab3">
                <Tab3 />
              </Route>
              <Route exact path="/profile">
                <Profile/>
              </Route>
              <Route exact path="/">
                <Redirect to="/main" />
              </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom" color="primary" className="ion-no-border">
            <IonTabButton tab="Main" href="/main">
              <IonIcon color={currentTab === "Main" ? "tertiary" : "secondary"} icon={home} size="small" />
            </IonTabButton>
            {/* <IonTabButton tab="tab2" href="/tab2">
              <IonIcon color={currentTab === "tab2" ? "tertiary" : "secondary"} icon={wallet} />
            </IonTabButton> */}
            <IonTabButton tab="tab3" href="/tab3">
              <IonIcon color={currentTab === "tab3" ? "tertiary" : "secondary"} icon={barChart} />
            </IonTabButton>
            <IonTabButton tab="profile" href="/profile">
              <IonIcon color={currentTab === "profile" ? "tertiary" : "secondary"} icon={person} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
