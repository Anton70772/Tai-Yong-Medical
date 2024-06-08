import { useState } from 'react';
import styles from '../../assets/Gallery.module.css';

const images: string[] = [
    '/1.jpg',
    '/2.jpg',
    '/kt.jpg',
    '/kt2.jpg',
    '/sky.jpg',
    '/sky.jpg',
    '/sky.jpg',
    '/sky.jpg',
    '/sky.jpg',
];

const Gallery: React.FC = () => {
    const [modalImage, setModalImage] = useState<string | null>(null);

    const openModal = (image: string) => {
        setModalImage(image);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <div className={styles.container}>
            <h1 className={styles.header}>Наша Галерея</h1>
            <p className={styles.description}>Посмотрите на новейшее оборудование и качество наших услуг.</p>
            <div className={styles.grid}>
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        className={styles.image}
                        onClick={() => openModal(image)}
                    />
                ))}
            </div>
            {modalImage && (
                <div className={`${styles.modal} ${styles.show}`} onClick={closeModal}>
                    <span className={styles.close}>&times;</span>
                    <img className={styles.modal_content} src={modalImage} alt="Enlarged view" />
                </div>
            )}
        </div>
    );
};

export default Gallery;