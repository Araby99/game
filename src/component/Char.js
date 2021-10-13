import { useState, useEffect } from 'react';
import './char.css';
import dialogData from './dialogData';
import mission from './mission';

export default function Char() {
    let bag = [
        {
            name: "potion",
            img: "data:image/jpeg;base64,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",
            usage: "Do Something"
        },
        {
            name: "potion",
            img: "data:image/jpeg;base64,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",
            usage: "Do Something"
        },
        {
            name: "potion",
            img: "data:image/jpeg;base64,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",
            usage: "Do Something"
        }
    ]
    const [coin, setCoin] = useState(0)
    const [bagOpen, setBagOpen] = useState(false);
    const [dialog, setDialog] = useState("");
    const [audio, setAudio] = useState("");
    const [value, setValue] = useState(0);
    const [missionId, setMissionId] = useState(0)
    const [progress, setProgress] = useState(false)
    const textUp = () => {
        if (value < dialogData.length) {
            if (progress == false) {
                if (value == 8) {
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
    const openBag = () => {
        if (bagOpen == true) {
            setBagOpen(false);
            document.getElementById("bag-contect").style.display = "none";
        } else if (bagOpen == false) {
            setBagOpen(true);
            document.getElementById("bag-contect").style.display = "flex";
        }
    }
    const check = () => {
        const selectBut = document.getElementById("select").value;
        const missionTrue = mission[missionId - 1].option.filter(el => {
            return el.answer == true;
        })
        if (selectBut == "true") {
            setDialog(missionTrue[0].name + " !");
            setProgress(false);
            setMissionId(0);
            setAudio("ExP.mp3");
            setTimeout(() => {
                setDialog("Correct ! Let's Continue");
            }, missionTrue[0].duration);
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
        return () => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div id="con">
            <audio autoPlay id="audio" src={audio}>
                <source src={audio} type="audio/mpeg" />
            </audio>
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
            <div className="bag">
                <div className="bag-contect" id="bag-contect">
                    {
                        bag.map(cont => {
                            const { name, img } = cont;
                            return (
                                <div className="bag-item">
                                    <h5>{name}</h5>
                                    <img src={img} alt="Bag Contect" />
                                </div>
                            )
                        })
                    }
                </div>
                <div className="bag-img" onClick={openBag}>
                    <img src="bag.png" alt="Bag" />
                </div>
            </div>
            <div className="coin">
                <img src="galion.webp" alt="Galion" />
                <h4>{coin}</h4>
            </div>
        </div>
    )
}