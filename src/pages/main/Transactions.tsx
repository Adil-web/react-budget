import { IonBackButton, IonButton, IonButtons, IonContent, IonDatetime, IonFab, IonFabButton, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from "@ionic/react"
import { arrowBack, arrowUp, calendar, swapVertical } from "ionicons/icons"
import { useEffect, useRef, useState } from "react";
import { useSelector } from 'react-redux';
import gif from "../../assets/stack.gif"
import List from "../../components/main/List";
import { Storage } from "@capacitor/storage";
// import Picker from "../../components/main/Picker.jsx";

function Transactions() {
    const ref: any = useRef()
    const [showButton, setShowButton] = useState(false)
    const budget = useSelector((state: any) => state.budget)
    const [data, setData] = useState(budget)
    const [date, setDate] = useState("")

    // async function get(key: string): Promise<any> {
    //     const item:any = await Storage.get({ key: key });
    //     return JSON.parse(item.value);
    // }

    async function test() {
        const data:any = (await Storage.get({key: "transactions"})).value
        console.log(data)
        setData(JSON.parse(data) || [])
    }
    
    useEffect(() => {
        // setData(budget)
        test()
    }, [budget])

    function filterTransactions(transactions: any, type: string = "", date: any = "") {
        if (type === "reverse") {
            console.log(transactions)
            setData([...transactions].reverse())
        }
        if (date && type === "date") {
            console.log(transactions)
            setDate(date)
            console.log(date)
            setData([...transactions].filter(t => {
                if (date.month.text === t.month && date.year.text === t.year) {
                    return t
                }
            }))
        }
    }

    function scrollToTop(delay = 500) {
        ref.current.scrollToTop(delay)
        setTimeout(() => {
            setShowButton(false)
        }, delay)
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonTitle>Транзакции</IonTitle>
                    <IonButtons slot="start">
                        <IonBackButton text="" icon={arrowBack} />
                    </IonButtons>
                    <IonButton slot="end" onClick={() => filterTransactions(data, "reverse")}>
                        <IonIcon slot="icon-only" icon={swapVertical} />
                    </IonButton>
                </IonToolbar>
            </IonHeader>
            <IonContent color="primary" scrollY={true} ref={ref} scrollEvents={true} onIonScroll={() => setShowButton(true)}>
                <IonItem color="primary">
                    <IonIcon slot="start" icon={calendar} />
                    <IonDatetime pickerOptions={{
                        buttons: [
                            {
                                text: 'Отмена',
                                handler: () => {
                                    console.log('Clicked Log. Do not Dismiss.');
                                }
                            },
                            {
                                text: 'Принять',
                                handler: (e) => filterTransactions(budget, "date", e)
                            },
                        ]
                    }}
                        value={date}
                        placeholder="Дата"
                        displayFormat="MM YYYY"
                        min={budget[budget.length - 1]?.year || "9999"}
                        max={new Date().getFullYear().toString()}>
                    </IonDatetime>
                    {/* <Picker
                        title={"Неделя"}
                        value={week}
                        setValue={setWeek}
                        data={budget}
                        setData={setData}
                        options={[
                            { text: 'Понедельник', value: 'Пн' },
                            { text: 'Вторник', value: 'Вт' },
                            { text: 'Среда', value: 'Ср' },
                            { text: 'Четверг', value: 'Чт' },
                            { text: 'Пятница', value: 'Пт' },
                            { text: 'Суббота', value: 'Сб' },
                            { text: 'Воскресенье', value: 'Вс' },
                        ]}
                        point={"week"}
                    /> */}

                </IonItem>
                {
                    data.length > 0
                        ? data.map((item: any) => {
                            return <List item={item} key={item.id} />
                        })
                        :
                        <>
                            <IonItem color="primary">
                                <IonLabel className="ion-text-center" color="medium">
                                    Нет данных...
                                </IonLabel>
                            </IonItem>
                            <IonItem color="primary">
                                <IonImg src={gif} />
                            </IonItem>
                        </>
                }
                {
                    showButton && <IonFab vertical="bottom" horizontal="end" slot="fixed">
                        <IonFabButton color="secondary" onClick={() => scrollToTop()}>
                            <IonIcon icon={arrowUp} />
                        </IonFabButton>
                    </IonFab>
                }
            </IonContent>
        </IonPage>
    )
}

export default Transactions
