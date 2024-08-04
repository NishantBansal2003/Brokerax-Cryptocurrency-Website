import { Component } from "react";
import slides from "./CraouselSlides";
import "../Style/Craousel.css";
import classNames from "classnames";

interface Slide {
  city: string;
  country: string;
  img: string;
}

interface CitiesSliderProps {
  slides: Slide[];
}

interface CitiesSliderState {
  activeSlide: number;
  prevSlide: number;
  sliderReady: boolean;
}

class CitiesSlider extends Component<CitiesSliderProps, CitiesSliderState> {
  IMAGE_PARTS: number;
  changeTO: NodeJS.Timeout | null;
  AUTOCHANGE_TIME: number;

  constructor(props: CitiesSliderProps) {
    super(props);

    this.IMAGE_PARTS = 4;
    this.changeTO = null;
    this.AUTOCHANGE_TIME = 4000;

    this.state = { activeSlide: -1, prevSlide: -1, sliderReady: false };
  }

  componentWillUnmount() {
    if (this.changeTO) {
      clearTimeout(this.changeTO);
    }
  }

  componentDidMount() {
    this.runAutochangeTO();
    setTimeout(() => {
      this.setState({ activeSlide: 0, sliderReady: true });
    }, 0);
  }

  runAutochangeTO() {
    this.changeTO = setTimeout(() => {
      this.changeSlides(1);
      this.runAutochangeTO();
    }, this.AUTOCHANGE_TIME);
  }

  changeSlides(change: number) {
    if (this.changeTO) {
      clearTimeout(this.changeTO);
    }
    const { slides } = this.props;
    const prevSlide = this.state.activeSlide;
    let activeSlide = prevSlide + change;
    if (activeSlide < 0) activeSlide = slides.length - 1;
    if (activeSlide >= slides.length) activeSlide = 0;
    this.setState({ activeSlide, prevSlide });
  }

  render() {
    const { activeSlide, prevSlide, sliderReady } = this.state;
    const { slides } = this.props;
    return (
      <div className={classNames("slider", { "s--ready": sliderReady })}>
        <p className="slider__top-heading">Contact Us</p>
        <div className="slider__slides">
          {slides.map((slide, index) => (
            <div
              className={classNames("slider__slide", {
                "s--active": activeSlide === index,
                "s--prev": prevSlide === index,
              })}
              key={slide.city}
            >
              <div className="slider__slide-content">
                <h3 className="slider__slide-subheading">
                  {slide.country || slide.city}
                </h3>
                <h2 className="slider__slide-heading">
                  {slide.city.split("").map((l, i) => (
                    <span key={i}>{l}</span>
                  ))}
                </h2>
                <p className="slider__slide-readmore">read more</p>
              </div>
              <div className="slider__slide-parts">
                {Array.from({ length: this.IMAGE_PARTS }).map((_, i) => (
                  <div className="slider__slide-part" key={i}>
                    <div
                      className="slider__slide-part-inner"
                      style={{ backgroundImage: `url(${slide.img})` }}
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div
          className="slider__control"
          onClick={() => this.changeSlides(-1)}
        />
        <div
          className="slider__control slider__control--right"
          onClick={() => this.changeSlides(1)}
        />
      </div>
    );
  }
}

export function renderCitiesSlider(slides: Slide[]) {
  return <CitiesSlider slides={slides} />;
}

export default function Craousel() {
  return renderCitiesSlider(slides);
}
