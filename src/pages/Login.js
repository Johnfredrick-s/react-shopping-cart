import { lazy, Suspense, useState } from 'react'
import NormalLogin from '../components/Auth/NormalLogin'
import { login, signup } from '../libs/api'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const Register = lazy(() => import('../components/Auth/Register'))

const Login = () => {
    const [logInType, setLogInType] = useState('login')
    const navigate = useNavigate()
    // useEffect(()=>{
    //     const get_user = async () => {
    //         const response = await getUser(11);
    //         console.log(response);
    //     }
    
    //     get_user()
    //   },[])

    const signUp = async (params) => {
        const resp = await signup(params)
        if(resp && resp.id){
            Cookies.set('userId',resp.id,{expires: new Date().getDate()+30})
            logIn({username:params.username,password:params.password})
        }
        // console.log(resp,"resp")
    }

    const logIn = async (params) => {
        const resp = await login(params)
        console.log(resp,"resp")
        if(resp){
            navigate('/products')
        }

    }

    return (
        <>
            <div className='main_width'>
                <div className={`${logInType === 'login' ? 'lg:w-[40%]' : 'lg:w-[55%]'} m-[0_auto]`}>
                    <h1 className={`capitalize text-lg font-semibold pb-5 text-center`}>{logInType}</h1>
                    {logInType === 'login' ? <NormalLogin logIn={logIn} setLogInType={setLogInType} /> :
                        <Suspense fallback={`<p>Loading...</p>`}  >
                            <Register signUp={signUp} setLogInType={setLogInType} />
                        </Suspense>}
                </div>
            </div>
        </>
    )
}

export default Login
