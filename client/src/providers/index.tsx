import { Toaster } from 'react-hot-toast'
import QueryProvider from './react.provider'

const Provider = ({ children }: { children: React.ReactNode }) => {

    return (

        <QueryProvider>

            {children}

            <Toaster
                position='bottom-center'
                reverseOrder={false}
                gutter={8}
                containerClassName=""
                containerStyle={{}}
                toastOptions={{
                    // Define default options
                    className: '',
                    duration: 5000,
                    removeDelay: 1000,
                    style: {
                        background: '#363636',
                        color: '#fff',
                    },

                    success: {
                        duration: 3000,
                        iconTheme: {
                            primary: 'green',
                            secondary: 'black',
                        },
                    },
                }}
            />
        </QueryProvider>

    )
}

export default Provider