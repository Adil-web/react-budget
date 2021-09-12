import { Doughnut } from 'react-chartjs-2';
import { ReactElement } from 'react'
import { IonCard, IonCardSubtitle } from '@ionic/react';

function DoughnutChart({ datas }: any): ReactElement {
    const data = {
        labels: ['Доход', 'Расход'],
        datasets: [
            {
                label: '# of Votes',
                data: [datas.income, datas.outcome],
                backgroundColor: [
                    'rgba(54, 162, 235, 0.1)',
                    'rgba(255, 99, 132, 0.1)',
                ],
                borderColor: [
                    'cyan',
                    'red',
                ],
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true
    }

    return (
        <>
            <IonCard className="ion-text-center" style={{ background: "#160f37" }}>
                <IonCardSubtitle color="light">Доход за месяц: {datas.income}&#8376;</IonCardSubtitle>
                <IonCardSubtitle color="light">Расход за месяц: {datas.outcome}&#8376;</IonCardSubtitle>
            </IonCard>
            <Doughnut data={data} options={options} />
        </>
    )
}

export default DoughnutChart
