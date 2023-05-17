import Logo from "../../../public/logo.svg";
import { BoxLogin } from "./style";
import {firebase, auth} from "../../Service/firebase"
import { GoogleLogo } from "@phosphor-icons/react";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

export function Login() {
    const navigate = useNavigate(); //REDIRECIONA PARA COMPONENTES 
    const {user, setUser} = useContext(AuthContext)

    useEffect(() => {

        auth.onAuthStateChanged((user) => {

            if (user) {
                const {uid, displayName, photoURL} = user;
                if (!displayName || !photoURL) throw new Error("O Usuario Não Tem displayName ou photoURL")
    
                setUser({

                    id: uid,
                    avatar: photoURL,
                    name: displayName,
                })

                if(user.displayName === "eXo Soluções"){

                    navigate("/tabela-adm")
    
    
                } else {

                    navigate("/tabela-usuario");
                }
            }

        })

    }, [])
    
    const handleClickButtonLogin = async () => {

        const provider = new firebase.auth.GoogleAuthProvider()

        const result = await auth.signInWithPopup(provider)

        if (result.user) {
            console.log(result.user)

            // SE ADM ("eXo Soluções") //////////////////////////////////////////////////////////////////
            if(result.user.displayName === "eXo Soluções"){

                navigate("/tabela-adm")


            } else {

                // SE NAO //////////////////////////////////////////////////////////////////
                const {uid, displayName, photoURL} = result.user;
                if (!displayName || !photoURL) throw new Error("O Usuario Não Tem displayName ou photoURL")

                setUser({
                    id: uid,
                    avatar: photoURL,
                    name: displayName,
                })

                navigate("/tabela-usuario");
            }

        }
    }

    
    return (
       
        <BoxLogin>

            <img className="photo" src={Logo}/> 

            <h1>Acesse sua conta</h1>

            <span>
                A <em>eXo Soluções </em> utiliza autenticação social, pois a autenticação com a Google<br />
                facilita a vida do usuário permitindo utilizar a aplicação sem fazer cadastrado.
            </span>

            <b>
                Para um melhor atendimento diga o nome de usuário e número de processo
                <br/>
                que se encontram na tabela.
            </b>

            <button type="button" onClick={handleClickButtonLogin} className="button">
                <GoogleLogo />
                Faça Login Com Google
            </button>
        
        </BoxLogin>
 
    )
}