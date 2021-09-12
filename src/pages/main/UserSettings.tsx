import { IonBackButton, IonButtons, IonHeader, IonIcon, IonImg, IonInput, IonItem, IonLabel, IonContent, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react'
import { arrowBack, person, wallet } from 'ionicons/icons'
import { ReactElement } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router'
import img from "../../assets/user.svg"
import { setBalance, setName } from '../../redux/userReducer'


function UserSettings(): ReactElement {
    const dispatch = useDispatch()
    const history = useHistory()

    const user = {
        name: "",
        balance: ""
    }

    function submit() {
        dispatch(setName(user.name))
        dispatch(setBalance(user.balance))
        history.push("/")
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Пользователь</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton text="" icon={arrowBack} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color="primary">
                <IonItem color="primary">
                    <IonImg src={img} />
                </IonItem>
                <IonItem color="primary">
                    <IonLabel position="floating">Ваше имя</IonLabel>
                    <IonIcon slot="start" icon={person} />
                    <IonInput type="text" maxlength={30} onIonChange={(e: any) => user.name = e.target.value}></IonInput>
                </IonItem>
                <IonItem color="primary">
                    <IonLabel position="floating">Ваш текущий счет</IonLabel>
                    <IonIcon slot="start" icon={wallet} />
                    <IonInput type="number" maxlength={7} onIonChange={(e: any) => user.balance = e.target.value}></IonInput>
                </IonItem>
                <IonButton expand="block" color="tertiary" onClick={submit}>Сохранить</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default UserSettings
