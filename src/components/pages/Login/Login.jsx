import React , {useState, useEffect} from 'react';
import { Link, Navigate, useNavigate } from '@tanstack/react-router';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Hero from '../../layouts/Hero'
import AlertComponent from '../../layouts/Alert';
import { useLogin } from '../../../hooks/useLogin';

const Login = () => {
  const [NameUser, setNameUser] = useState('');
  const [PassHash, setPassHash] = useState('');
  const navigate = useNavigate();
  const [responseData, setResponseData] = useState(null); 
  const [isSpinner, setisSpinner] = useState(false);
  const [isShowAlert, setIsShowAlert] = useState(false);
  const [mensajeAlerta, setMensajeAlerta] = useState('');
  const [tipoAlerta, setTipoAlerta] = useState('');
  const { mutate, isLoading, isError, isSuccess, error } = useLogin();
  
  const handleSubmit = async (event) => {
    navigate({ to: '/home' })
    event.preventDefault();
    
    // Lógica de autenticación...
     const user = { NameUser, PassHash }

    /* mutate(user,{
       onSuccess: (res) => {
        if(res.data != null){
          localStorage.setItem('apiToken', res.data);
          navigate('/home');  // Redirige al usuario a la ruta '/' después del login exitoso
        } else  {
          setIsShowAlert(true)
          setMensajeAlerta('Usuario y/o contraseña incorrecta.');
          setTipoAlerta('error');
          setisSpinner(false);
        }
      },
      onError:() =>{
        navigate('/home');
        setIsShowAlert(true)
        setMensajeAlerta('Error al momento de iniciar sesión, vuelve a intentar');
        setTipoAlerta('error');
        setisSpinner(false);
      } } );  */
  };

  function getDate() {
    const today = new Date();
    const month = today.getMonth() + 1;
    const year = today.getFullYear();
    const date = today.getDate();
    return `${month}/${date}/${year}`;
  }

  return (
    <>
      <div className=''>
                {isShowAlert ? (
                    <AlertComponent  message={mensajeAlerta} type={tipoAlerta}/>
                ) : null}
      </div>

      <div className="">
          <Hero title={"Ingresa"} image={""} className=""/>                
      </div> 

      <section className="w-full max-w-7xl mx-auto px-5  md:py-16 flex flex-col gap-10">

        <form onSubmit={handleSubmit} className=' flex flex-col items-center justify-center w-full'>

          <div className='flex items-center justify-center w-full max-w-sm'>
            <FontAwesomeIcon 
              className='pr-2 text-3xl text-cyan-700' 
              icon='fa-solid fa-user' 
            />
            <input 
              className='mb-1 h-9 w-full border border-gray-300 hover:text-fuchsia-900 placeholder:text-fuchsia-900 rounded-md shadow-lg shadow-fuchsia-900 focus:outline-none focus:ring-fuchsia-900 focus:border-fuchsia-900 sm:text-sm' 
              placeholder='Usuario'
              type="text" 
              id='NameUser'
              value={NameUser} 
              onChange={(e) => setNameUser(e.target.value)} 
              required 
            />
          </div>

          <div className='pt-5 flex items-center justify-center w-full max-w-sm'>
            <FontAwesomeIcon 
              className='pr-2 text-3xl text-fuchsia-900' 
              icon='fa-solid fa-key' 
            />
            <input 
              className='h-9 w-full border border-gray-300 hover:text-fuchsia-900 placeholder:text-fuchsia-900 rounded-md shadow-lg shadow-fuchsia-900 focus:outline-none focus:ring-fuchsia-900 focus:border-fuchsia-900 sm:text-sm' 
              placeholder='Contraseña'
              type="password" 
              id='PassHash'
              value={PassHash} 
              onChange={(e) => setPassHash(e.target.value)} 
              required 
            />
          </div>

          <div className='w-full max-w-sm flex justify-end pt-5 px-1'>
            <button
              type="button"
              onClick={() => navigate({ to: '/forgotPassword' })}
              className='text-xs font-semibold text-fuchsia-900 hover:text-fuchsia-900 hover:underline bg-transparent border-none cursor-pointer focus:outline-none'
            >
              ¿Olvidaste tu contraseña?
            </button>
          </div>
          
          <button 
            className='mt-7 border rounded-full w-35 h-10 font-bold border-gray-300 text-white shadow-lg shadow-fuchsia-900 focus:outline-none focus:ring-fuchsia-900 focus:border-fuchsia-900 sm:text-sm bg-fuchsia-900 hover:text-fuchsia-900 hover:bg-white transition-colors' 
            type="submit" 
            disabled={isLoading}
          >
            {isSpinner ? 'Iniciando ...' : 'Iniciar Sesión'}
          </button>

          <div className='w-full max-w-sm flex items-center my-6'>
            <div className='flex-1 border-t border-gray-200'></div>
            <span className='px-3 text-xs text-gray-400 uppercase tracking-wider'>o</span>
            <div className='flex-1 border-t border-gray-200'></div>
          </div>

          <div className='w-full max-w-sm flex justify-center items-center text-center mt-2'>
            <p className='text-sm text-gray-600 m-0 flex items-center gap-1 justify-center'>
              <span>¿No tienes una cuenta?</span>
              <button
                type="button"
                onClick={() => navigate({ to: '/register' })}
                className='font-bold text-fuchsia-900 hover:text-fuchsia-900 hover:underline bg-transparent border-none cursor-pointer focus:outline-none p-0 inline-block'
              >
                Regístrate aquí
              </button>
            </p>
          </div>

        </form>
      </section>
    </>
  );
};

export default Login;