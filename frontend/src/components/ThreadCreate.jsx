import React from 'react'
import ThreadService from '../api/ThreadService'


// Поскольку тред является оболочкой для списка постов с главным постом
// то новый тред создается совместно с главным постом
// то есть нужно ввести данные главного поста
// а данные нового треда заполняются автоматически
export default function ThreadCreate({ addThreadOnClient }) {
    //...

    return (
        <>
            <h4>Новый тред</h4>
            {/*...*/}
        </>
    )
}
