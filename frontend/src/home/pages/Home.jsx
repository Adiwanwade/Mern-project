import ContentBox from "../../Content/ContentBox"
const Home = () => {
    return (
        <>
        <div className="w-full flex place-items-center justify-center p-6 text-lg">Home!</div>
        <ContentBox title={"About Me"} content={`I am a full stack developer with experience in both front and back end development.`}/>    
        
        </>
    );
};

export default Home;