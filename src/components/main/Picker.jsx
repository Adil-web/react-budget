import { IonButton, useIonPicker } from "@ionic/react"


function Picker({value, setValue, options, point, title, data, setData}) {
    const [present] = useIonPicker()

    return (
        <IonButton
            expand="block"
            onClick={() =>
                present(
                    [
                        {
                            name: point,
                            options
                        },
                    ],
                    [
                        {
                            text: 'Выбрать',
                            handler: (selected) => {
                                const item = Object.getOwnPropertyNames(selected)[0]
                                if(item === "week") {
                                    setValue(selected.week.value)
                                }
                                if(item === "month") {
                                    setValue(selected.month.value)
                                }
                                
                                const filteredData = data.filter((t) => {
                                    if(item === "month") {
                                        if(t.month === selected.month.value) {
                                            return t
                                        }
                                    }
                                    if(item === "week") {
                                        if(t.day === selected.week.value) {
                                            return t
                                        }
                                    }
                                })
                                setData(filteredData)
                            },
                        },
                    ]
                )
            }
        >
            {title}: {value}
        </IonButton>
    )
}

export default Picker
