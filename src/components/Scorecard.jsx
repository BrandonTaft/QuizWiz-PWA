import React, { useState, useEffect } from 'react';

function ScoreCard({finalScore}) {
    const [myScore, setMyScore] = useState(null)
    const [wizardName, setwizardName] = useState("")

    useEffect(() => {
        let name = localStorage.getItem('name')
        setwizardName(name.toUpperCase())
        getuserscore(name)
    }, []);

    function getuserscore(wizardName) {
        fetch(`https://polar-dawn-36653.herokuapp.com/api/userscore?username=${wizardName}`)
        .then(response => response.json())
        .then(myScore => {
            setMyScore(myScore.score)
        })
    };

    return (
        <div className="scorecard">
            {finalScore ?
            <>
            <div>YOUR SCORE</div>
            <div className="card-score">   
                { finalScore ? finalScore : '000' }
            </div>
            </>
            :
            <>
            <div>YOUR HIGH SCORE</div>
            <div className="card-score">      
            { myScore ? myScore : '000' }
            </div>
            </>
}
        </div>
    )
}

export default ScoreCard