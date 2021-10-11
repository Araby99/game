import { useState, useEffect } from 'react';
import './char.css';
import dialogData from './dialogData';
import mission from './mission';

export default function Char() {
    const [dialog, setDialog] = useState("");
    const [value, setValue] = useState(0);
    const [missionId, setMissionId] = useState(0)
    const [progress, setProgress] = useState(false)
    const textUp = () => {
        if (value < dialogData.length) {
            if (progress == false) {
                if (value == 5) {
                    setMissionId(1);
                    setProgress(true);
                }
                setDialog(dialogData[value])
                setValue(value + 1);
            } else {
                alert("You Must Answer the question !");
            }
        } else {
            setDialog("Thanks for playing ! I wish you like it")
        }
    }
    const textDown = () => {
        if (value - 2 >= 0) {
            setDialog(dialogData[value - 2])
            setValue(value - 1);
            if (value == 5) {
                setMissionId(1)
            }
        } else {
            setDialog(dialogData[0]);
            setValue(1)
        }
    }
    const check = () => {
        const selectBut = document.getElementById("select").value;
        if (selectBut == "true") {
            setDialog("Correct ! Let's Pass");
            setProgress(false);
        } else if (selectBut == "false") {
            setDialog("Hmmm .. I think it isn't right. Try Again !");
        }
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            document.getElementById("char").style.opacity = "1";
            setDialog("Hello I am Harry Potter ! Note: Click on text to contiune");
            setValue(1)
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            <div className="char" id="char">
                <p className="dialog" id="dialog" value={value} onClick={textUp} onWheel={textDown}>{dialog}</p>
                <img src="harry.png" alt="Char" />
            </div>
            <div className="mission">
                {
                    mission.filter((el) => {
                        return el.id == missionId;
                    }).map(char => {
                        const { img, option } = char;
                        return (
                            <div>
                                <img src={img} alt="Img" />
                                <select className="form-select" aria-label="Default select example" id="select" onChange={check}>
                                    <option defaultValue>What will you do ?</option>
                                    {
                                        option.map(opt => {
                                            const { name, answer } = opt
                                            return (
                                                <option value={answer}>{name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
    const selectBut = document.getElementById("select").value;
}