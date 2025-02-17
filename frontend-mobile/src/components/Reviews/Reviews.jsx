import { useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Box, Typography, Avatar, colors, Button } from "@mui/material";
import { ReactComponent as ReviewsTitle } from '../Reviews/ReviewsTitle.svg'

const reviews = [
    {
        name: "Alexa",
        text: "Обменяли безналичные рубли на наличные баты через курьера. Молодой человек 🚖 подъехал менее чем через час, наличные уже в руках. Перевели ₽ по номеру телефона, получили баты. Всё четко. Довольные, отдых продолжается 🥰 Курс приятный (сравнивал с другими вариантами). Спасибо",
    },
    {
        name: "Kseniya",
        text: "Обмен прошел успешно и по приятному курсу. Большое спасибо! Возникла проблема с тем что банкомат затупил не выдал деньги, Дмитрий обратился в поддержку, взял все риски на себя и выдал деньги через другой банкомат. Так что даже в сложных ситуациях ребята не бросят и найдут решение",
    },
    {
        name: "Юрий",
        text: "Спасибо! Всё прошло быстро и без единой проблемы! Хороший курс, рекомендую! Буду и дальше обращаться",
    },
    {
        name: "Алексей",
        text: "10к бат по приемлемому курсу, отправил деньги, человек отправил код, снял налик в жёлтом банке 🎋",
    },
    {
        name: "Max Bakhvalov",
        text: "Я из РФ пополняю вообще, удобно, курс такой же чем я через 3 дня колена сам бы пополнял через эти биржи все. Ровный сервис))",
    },
    {
        name: "~",
        text: "Вчера впервые менял рубли на баты: прошло быстро, курс хороший, помогли разобраться с банкоматом, остался доволен, обращусь ещё. Всем рекомендую!!👍",
    },
    {
        name: "Shanti People",
        text: "Все четко. Меняйте по хорошему курсу, на данный момент самый адекватный. А на сэкономленные купите себе кофе с булочкой в Старбакс)",
    },
    {
        name: "Анна Таранова",
        text: "Получали баты через банкомат, все отлично, курс хороший, надежный менеджер 👌",
    },
    {
        name: "An",
        text: "Произвел два обмена, все четко и быстро, админ постоянно на связи, удобно и с подробной инструкцией, и самое главное это отличный курс, большое спасибо 👍👍👍",
    },
    {
        name: "Rasul",
        text: "Меняю уже в третий раз. Всё хорошо, без проблем и по лучшему курсу. Спасибо!",
    },
    {
        name: "Иван Бондарь",
        text: "Только что обменял 5000 Батт Оперативно! Пушка гонка 🏎",
    },
    {
        name: "Kit Belor",
        text: "Уже год меняю здесь 😎 Всегда быстро, выгодно, с пониманием 😅",
    },
    {
        name: "Andrei",
        text: "Обращаюсь не в первый раз, как всегда выгодный курс и быстрый обмен. Спасибо!",
    },
    {
        name: "Татьяна 🎭",
        text: "Благодарю вас, что выручаете с обменом 🥰 всегда остаюсь довольна сервисом, рекомендую вас как надежного и проверенного обменника с выгодным курсом 👍 желаю вам процветания и иметь больше клиентов!",
    },
    {
        name: "Vera Suvorova",
        text: "Курс огонь, Дмитрий огонь, не в первый раз меняем и все четко, уже и друзьям советовали, у них тоже не было никогда проблем 🤙 спасибо",
    },
    {
        name: "masha",
        text: "Дважды обменивала через этот сервис, все проходит отлично, быстро и оперативно отвечают 🫶. Приятная минимальная сумма для обмена, можно удобно снять через банкомат без наличия карты)",
    },
    {
        name: "Artem",
        text: "Отличный обмен, можно доверять",
    },
    {
        name: "Андрей Шеповалов",
        text: "Ребятки, 2 года уже живу на Пхукете, суммарно раз 10 менял у этих ребят через умы и каждый раз всё гладко. Ну и самый выгодный курс на острове. Можете хоть обыскаться, но выгоднее не найдете нигде. Всем пис ✌️",
    },
    {
        name: "Victoria",
        text: "Регулярно меняю уже почти 2 года, все каждый раз приходит гладко, курс выгодный, различные банки 🙏",
    },
    {
        name: "Oli",
        text: "Добрый день, в первый день приехали в Бангкок, обменяли просто за 10мин у банкомата. Все быстро и надежно :) рекомендую !!",
    }
];

const ReviewsCarousel = () => {
    const swiperRef = useRef(null);
    const animationRef = useRef(null);
    const positionRef = useRef(0);

    useEffect(() => {
        const speed = 0.05; // Скорость прокрутки
        let lastTime = performance.now();

        const animate = (time) => {
            if (swiperRef.current) {
                let elapsed = time - lastTime;
                lastTime = time;

                // Обновляем позицию ленты
                positionRef.current -= elapsed * speed;

                // Получаем `swiper-wrapper` и изменяем `transform`
                swiperRef.current.wrapperEl.style.transform = `translate3d(${positionRef.current}px, 0, 0)`;

                // Зацикливаем, если ушли далеко влево
                if (positionRef.current < -swiperRef.current.wrapperEl.scrollWidth / 2) {
                    positionRef.current = 0;
                }
            }
            animationRef.current = requestAnimationFrame(animate);
        };

        animationRef.current = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationRef.current);
    }, []);

    return (
        <Box position="relative" width="100%" maxWidth="1400px" mx="auto" py={4} mb={3} >
            <Box sx={{ display: "flex", justifyContent: "flex-start", alignItems: "flex-start", mb: "20px", ml: "2rem",  width: "220px" }}>
                <ReviewsTitle sx={{ width: "550px", height: 'auto' }} />
            </Box>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView="auto"
                spaceBetween={15}
                allowTouchMove={false} // Отключаем ручное перелистывание
                style={{
                    display: "flex",
                    alignItems: "center",
                    overflow: "hidden" // Прячем лишние слайды
                }}
                breakpoints={{
                    640: { slidesPerView: 1.8, spaceBetween: 15 },
                    1024: { slidesPerView: 4.2, spaceBetween: 20 },
                    1440: { slidesPerView: 4.2, spaceBetween: 30 },
                }}

            >
                {[...reviews, ...reviews].map((review, index) => ( // Дублируем для бесконечности
                    <SwiperSlide
                        key={index}
                        style={{
                            flexShrink: 0,
                            willChange: "transform",
                            margin: "10px", // Добавляем отступ, чтобы тень не обрезалась

                            borderRadius: "12px", // Округляем углы

                        }}
                    >
                        <Box
                            sx={{
                                width: "270px",
                                height: "230px",
                                background: "none",
                                borderRadius: "12px",
                                border: "2px solid #004db4",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                textAlign: "left",
                                userSelect: "none",
                                // Добавляем отступ, чтобы тень не обрезалась
                                filter: "drop-shadow(0 5px 10px rgba(0, 0, 0, 0.2))" // Вместо boxShadow// Дополнительная внутренняя тень
                            }}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar src={review.image} sx={{ width: 50, height: 50, mr: 2 }} />
                                <Typography variant="h6" sx={{ fontWeight: "bold", color: "#0E1111" }}>
                                    {review.name}
                                </Typography>
                            </Box>
                            <Typography sx={{ mt: 1, fontSize: "14px", lineHeight: "1.4", color: "black" }}>{review.text}</Typography>
                        </Box>
                    </SwiperSlide>
                ))}


            </Swiper>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',  // Выравнивание по горизонтали
                    alignItems: 'center',       // Если нужно и по вертикали
                    minHeight: '100px',         // Примерная высота контейнера
                }}
            >
                <Button
                    variant="contained"
                    sx={{
                        backgroundColor: '#f87000',
                        color: '#fff',
                        borderRadius: '20px',     // Скруглённые углы
                        padding: '8px 16px',      // Отступы внутри кнопки
                        textTransform: 'none',    // Отключаем капс
                        fontWeight: 'bold',
                        '&:hover': {
                            backgroundColor: '#f87000',
                            opacity: 0.85,
                        },
                    }}
                    onClick={() => {
                        window.open('https://t.me/+3BWEMQxeqk0wODNl', "_blank", "noopener,noreferrer");
                    }}
                >
                    Все отзывы
                </Button>
            </Box>
        </Box>
    );
};

export default ReviewsCarousel;


