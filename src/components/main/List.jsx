import { IonIcon, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonNote, IonText } from "@ionic/react"
import { trendingUp, trendingDown } from 'ionicons/icons';
import './List.css'
import { useDispatch } from 'react-redux';
import { deleteTransaction } from "../../redux/budgetReducer";

function List({ item }) {
    const dispatch = useDispatch()
    
    return (
        <IonItemSliding>
            <IonItem color="primary" key={item.id}>
                <IonIcon
                    slot="start"
                    icon={item.type === "income" ? trendingUp : trendingDown}
                    color={item.type === "income" ? "success" : "danger"}
                ></IonIcon>
                <IonText>
                    <div className="transaction-title">{item.title}</div>
                    <div className="transaction-date">
                        {item.date} {item.time}
                    </div>
                </IonText>
                <IonNote
                    slot="end"
                    color={item.type === "income" ? "success" : "danger"}
                    style={{ fontSize: "14px" }}
                >
                    {item.type === "income" ? "+" : "-"}{item.value}&#8376;
                </IonNote>
            </IonItem>
            <IonItemOptions side="end">
                <IonItemOption color="warning">
                    Изменить
                </IonItemOption>
                <IonItemOption color="danger" onClick={() => dispatch(deleteTransaction(item.id))}>
                    Удалить
                </IonItemOption>
            </IonItemOptions>
        </IonItemSliding>
    )
}

export default List
