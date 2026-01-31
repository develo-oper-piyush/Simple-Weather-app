import { Moon, Search, Sun, Waves, Wind } from "lucide-react";
import { ThemeProvider, useTheme } from "./context/theme-provider";
import { useEffect, useState } from "react";

const SearchBar = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState("");

    const handleSearch = () => {
        if (searchTerm.trim()) {
            onSearch(searchTerm);
            setSearchTerm("");
        }
    };

    return (
        <div className="flex items-center justify-around mt-6 w-full px-2">
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-background rounded-full pl-4 sm:pl-8 p-2 w-full ml-2 sm:ml-5 mr-2 sm:mr-5 placeholder:text-xl placeholder:text-slate-500 ring-slate-400 ring-2 shadow-md focus:outline-none placeholder:select-none"
                placeholder="Search"
            />
            <div
                className="bg-background rounded-full p-2 cursor-pointer mr-2 sm:mr-5 shadow-md ring-slate-400 ring-2 focus:outline-none"
                onClick={handleSearch}
            >
                {<Search className="text-foreground"></Search>}
            </div>
        </div>
    );
};

const Header = () => {
    const { theme, setTheme } = useTheme();
    const isDark = theme === "dark";

    return (
        <div className="flex gap-2 justify-center sm:justify-start">
            <div
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className={`w-6 h-6 cursor-pointer transition-transform duration-500 ${isDark ? "rotate-180" : "rotate-0"} `}
            >
                {isDark ? (
                    <Sun className="h-6 w-6 text-yellow-500 rotate-0 transition-all"></Sun>
                ) : (
                    <Moon className="h-6 w-6 text-blue-500 rotate-0 transition-all"></Moon>
                )}
            </div>
            <span className="hidden sm:block bg-slate-700 text-white select-none rounded-md p-1 border-b-2 border-r-2 border-gray-400">
                Toggle dark mode
            </span>
        </div>
    );
};

const WeatherIcon = ({ desc, icon }) => {
    const Icon_image = (ic) => {
        const icons = {
            "01d": "http://openweathermap.org/img/wn/01d@2x.png",
            "01n": "http://openweathermap.org/img/wn/01n@2x.png",
            "02d": "http://openweathermap.org/img/wn/02d@2x.png",
            "02n": "http://openweathermap.org/img/wn/02n@2x.png",
            "03d": "http://openweathermap.org/img/wn/03d@2x.png",
            "03n": "http://openweathermap.org/img/wn/03n@2x.png",
            "04d": "http://openweathermap.org/img/wn/04d@2x.png",
            "04n": "http://openweathermap.org/img/wn/04n@2x.png",
            "09d": "http://openweathermap.org/img/wn/09d@2x.png",
            "09n": "http://openweathermap.org/img/wn/09n@2x.png",
            "10d": "http://openweathermap.org/img/wn/10d@2x.png",
            "10n": "http://openweathermap.org/img/wn/10n@2x.png",
            "11d": "http://openweathermap.org/img/wn/11d@2x.png",
            "11n": "http://openweathermap.org/img/wn/11n@2x.png",
            "13d": "http://openweathermap.org/img/wn/13d@2x.png",
            "13n": "http://openweathermap.org/img/wn/13n@2x.png",
            "50d": "http://openweathermap.org/img/wn/50d@2x.png",
            "50n": "http://openweathermap.org/img/wn/50n@2x.png",
        };
        return icons[ic];
    };

    return (
        <div className="flex w-full p-5 flex-col justify-center items-center">
            <img
                src={
                    Icon_image(icon)
                        ? Icon_image(icon)
                        : `https://cdn.iconscout.com/icon/free/png-256/free-ios-weather-icon-svg-download-png-461610.png?f=webp`
                }
                alt="Weather_condition"
                className="h-32 w-32"
            />
            <p className="text-background font-gilroy-md text-center">{desc}</p>
        </div>
    );
};

const Temp = ({ temp, city }) => {
    return (
        <div className="flex flex-col justify-center items-center w-full">
            <h1 className="text-background font-gilroy-md text-xl">
                {temp ? temp : "21°C"}
            </h1>
            <h2 className="text-background font-gilroy-md text-2xl">
                {city ? city : "New York"}
            </h2>
        </div>
    );
};

const Footer = ({ humidity, wind_speed }) => {
    return (
        <div className="flex flex-col sm:flex-row w-full items-center justify-around gap-4 sm:gap-0">
            <div className="text-background flex flex-col justify-center items-center">
                <Waves className="mb-2" size={35} />
                <p className="font-gilroy-md">
                    {humidity ? humidity + " %" : "67 %"}
                </p>
                <p className="font-gilroy-md">Humidity</p>
            </div>

            <div className="text-background flex flex-col justify-center items-center">
                <Wind className="mb-2" size={35} />
                <p className="font-gilroy-md">
                    {wind_speed ? wind_speed + " Km/h" : "2.06 Km/h"}
                </p>
                <p className="font-gilroy-md">Wind Speed</p>
            </div>
        </div>
    );
};

const AppContent = ({ WeatherDet, onSearch }) => {
    return (
        <div className="flex h-screen w-screen text-foreground bg-background flex-col items-center justify-center px-4">
            {/* Container */}
            <div className="flex flex-col items-center justify-center gap-4 w-full max-w-sm sm:max-w-md ">
                {/* Header */}
                <Header />
                {/* Main */}
                <div className="w-full rounded-md shadow-md ring-1 ring-slate-300 pb-6 bg-linear-to-tr from-violet-700 to-violet-300">
                    {/* Search Bar */}
                    <SearchBar onSearch={onSearch} />
                    {/* Weather Icon */}
                    <WeatherIcon
                        desc={WeatherDet.weather_cond}
                        icon={WeatherDet.icon}
                    />
                    {/* Temperature & City */}
                    <Temp temp={WeatherDet.temp} city={WeatherDet.city} />
                    {/* Footer */}
                    <Footer
                        humidity={WeatherDet.humidity}
                        wind_speed={WeatherDet.wind_speed}
                    />
                </div>
            </div>
        </div>
    );
};

const App = () => {
    const [WeatherDet, setWeatherDet] = useState(false);

    const search = async (city_name) => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${import.meta.env.VITE_API_KEY}`;

            const res = await fetch(url);
            const data = await res.json();
            console.log(data);

            if (data.main && data.name) {
                setWeatherDet({
                    temp: `${Math.round(data.main.temp - 273.15)}°C`,
                    city: data.name,
                    humidity: data.main.humidity,
                    wind_speed: data.wind.speed,
                    icon: data.weather[0].icon,
                    weather_cond: data.weather[0].description,
                });
            }
        } catch (error) {
            console.log("Error fetching weather data:", error);
        }
    };

    useEffect(() => {
        search("London");
    }, []);

    return (
        <ThemeProvider defaultTheme="dark">
            <AppContent WeatherDet={WeatherDet} onSearch={search} />
        </ThemeProvider>
    );
};

export default App;
