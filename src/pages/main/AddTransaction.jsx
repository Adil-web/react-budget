import { IonContent,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonButtons,
        IonBackButton,
        IonPage,
        IonItem,
        IonImg,
        IonInput, 
        IonLabel,
        IonButton,
        IonSelect,
        IonSelectOption,
        IonDatetime,
        IonToast,
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import { useState } from 'react';
import { useHistory } from 'react-router';
import image from '../../assets/addTransactions.svg'
import { getDate } from '../../utils/getDate';
import { useDispatch } from 'react-redux';
import { addTransaction } from '../../redux/budgetReducer';

let data = {
    id: Date.now().toString(16),
    type: "outcome",
    title: "",
    value: "",
    date: getDate(),
    day: getDate("day"),
    month: getDate("month"),
    year: getDate("year"),
    time: getDate("time")
}

function AddTransaction() {
    const history = useHistory()
    const dispatch = useDispatch()
    const [showToast, setShowToast] = useState(false);
    const [text, setText] = useState("");

    function addData() {
        if(data.title && data.value) {
            dispatch(addTransaction(data))
            data = {
                id: Date.now().toString(16),
                type: "outcome",
                title: "",
                value: "",
                date: getDate(),
                day: getDate("day"),
                month: getDate("month"),
                year: getDate("year"),
                time: getDate("time")
            }
            history.push("/")
        } else {
            setText("Введите данные")
            setShowToast(true)
        }
    }

    function setDate(e) {
        data.date = getDate(null, new Date(e.detail.value))
        data.year = getDate("year", new Date(e.detail.value))
        data.month = getDate("month", new Date(e.detail.value))
        data.day = getDate("day", new Date(e.detail.value))
        data.time = getDate("time", new Date(e.detail.value))
    }
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Добавить транзакцию</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton text="" icon={arrowBack} />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent color="primary">
                <IonToast
                    isOpen={showToast}
                    onDidDismiss={() => setShowToast(false)}
                    message={text}
                    duration={1000}
                />
                <IonItem color="primary">
                    <IonImg src={image} />
                </IonItem>
                <IonItem color="primary">
                    <IonLabel>Тип</IonLabel>
                    <IonSelect value={"outcome"} placeholder="Доход/расход" onIonChange={e => data.type = e.detail.value}>
                        <IonSelectOption value="income">Доход</IonSelectOption>
                        <IonSelectOption value="outcome">Расход</IonSelectOption>
                    </IonSelect>
                </IonItem>
                <IonItem color="primary">
                    <IonLabel position="floating">Название</IonLabel>
                    <IonInput type="text" placeholder="Продукты" clearInput onIonChange={e => data.title = e.target.value} />
                </IonItem>
                <IonItem color="primary">
                    <IonLabel position="floating">Сумма</IonLabel>
                    <IonInput type="number" placeholder="50000" clearInput onIonChange={e => data.value = e.target.value} />
                </IonItem>
                <IonItem color="primary">
                    <IonDatetime
                        value={new Date().toUTCString()}
                        dayShortNames={["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"]}
                        displayFormat="D MMM H:mm"
                        monthShortNames="янв., фев., мар., апр., май., июн., июл., авг., сен., окт., ноя., дек."
                        onIonChange={e => setDate(e)}
                    ></IonDatetime>
                </IonItem>
                <IonButton expand="full" color="tertiary" onClick={addData}>Добавить</IonButton>
            </IonContent>
        </IonPage>
    )
}

export default AddTransaction
