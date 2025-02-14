import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Navigation } from "swiper/modules";
import { Box, Typography, Avatar } from "@mui/material";
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

    return (
        <Box position="relative" width="100%" maxWidth="1400px" mx="auto" py={4}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    mb: "20px",
                    ml: '2rem'

                }}
            >

                <ReviewsTitle sx={{ width: '750px' }} />
            </Box>
            <Swiper
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                slidesPerView={1.2}
                centeredSlides={true}
                spaceBetween={20}
                loop={true}
                autoplay={{ delay: 3000, disableOnInteraction: false }}
                pagination={{ clickable: true }}
                navigation={{ nextEl: ".swiper-button-next", prevEl: ".swiper-button-prev" }}
                modules={[Autoplay, Navigation]}
                breakpoints={{
                    640: { slidesPerView: 1.1, spaceBetween: 15 },
                    1024: { slidesPerView: 4.2, spaceBetween: 20 },
                    1440: { slidesPerView: 4.2, spaceBetween: 30 },
                }}
            >
                {reviews.map((review, index) => (
                    <SwiperSlide key={index}>
                        <Box
                            sx={{
                                width: "270px",
                                height: "230px",
                                background: "#fff",
                                borderRadius: "10px",
                                border: "2px solid #004db4",
                                boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
                                padding: "20px",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "flex-start",
                                textAlign: "left",
                                userSelect: "none"
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
        </Box>
    );
};

export default ReviewsCarousel;

