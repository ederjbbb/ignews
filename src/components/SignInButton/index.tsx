import {FaGithub} from 'react-icons/fa';
import { useSession, signIn, signOut } from "next-auth/react"
import {FiX} from 'react-icons/fi'
import styles from './styles.module.scss'

export function SignInButton(){

    const session = useSession();
    console.log(session)
    

    return session.data ? (
        <button 
        type='button'
        className={styles.signInButton}
        onClick={() => signOut()}
        >
            <FaGithub color='#04d361'/>
            {session.data.user.name}
            <FiX color='#737380'
            className= {styles.closeIcon}
            />
        </button>
    ) : (
        <button 
        type='button'
        className={styles.signInButton}
        onClick={() => signIn('github')}
        >
            <FaGithub color='#eba417'/>
            Sign in with Github
        </button>
    )

}