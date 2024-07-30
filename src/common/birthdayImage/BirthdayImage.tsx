import BirthdayImageComponent from '../../components/birthdayComponent/BirthdayImageComponent';

const BirthdayImage = (props:any) => {
    return (
        <div>
            <BirthdayImageComponent
                imgSrc={props?.image}
                title={props?.title}
                description={props?.description}
            />
        </div>
    );
};

export default BirthdayImage;
