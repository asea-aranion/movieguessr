import { getProphecy } from "../utils";
import { useEffect, useState, useRef } from "react";

function CrystalBall({
    guess,
    movie,
    hint,
}: {
    guess: string;
    movie: string;
    hint: number;
}) {
    const [prophecy, setProphecy] = useState("");
    const hintRef = useRef<number>(hint);
    const prompt = `This is a user's guess, ${guess}, and the actual movie is ${movie}. If they're close to the
                    actual title, just missing a few punction or words, return an empty string. If they're
                    not close, give them a one sentence hint to guide them in the right direction.`;

    useEffect(() => {
        const fetchReponse = async () => {
            if (hint > hintRef.current) {
                hintRef.current = hint;

                try {
                    const response = await getProphecy(String(prompt));

                    if (response) {
                        setProphecy(response);
                    }
                } catch (e) {
                    console.error(e);
                }
            }
        };

        fetchReponse();
    }, [prompt, hint]);

    return (
        <>
            <p>Prophecy: {prophecy}</p>
        </>
    );
}

export default CrystalBall;
