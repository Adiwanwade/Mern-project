import { Button} from 'flowbite-react';
export default function CallToAction() {
  return (
    <div className='flex flex-col sm:flex-row p-3 border border-teal-500 justify-center items-center rounded-tl-3xl rounded-br-3xl text-center'>
        <div className="flex-1 justify-center flex flex-col">
            <h2 className='text-2xl'>
                Want to learn more about Movies?
            </h2>
            <p className='text-gray-500 my-2'>
                Checkout these blogs with {`100's`} of movie reviews
            </p>
            <Button gradientDuoTone='purpleToPink' className='rounded-tl-xl rounded-bl-none'>
                <a href='' target='_blank' rel='noopener noreferrer'>
                    Posts
                </a>
            </Button>
        </div>
        <div className="p-7 flex-1 ">
            <img src="https://img.freepik.com/free-vector/flat-photocall-template-movie-premiere-event_23-2149506492.jpg?w=996&t=st=1715267554~exp=1715268154~hmac=f1b05d02a518f22c7f37188ef48895fc76e1096629eaa9313bcae7c966bd6d1e" className='max-w-2xl'/>
        </div>
    </div>
  )
}