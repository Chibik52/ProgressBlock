class ProgressBarBlock {
    constructor(container, options = {}) {
        if (typeof container === "string") this.container = document.getElementById(container);
        else throw Error("Container element invalid");

        if (!this.container)throw Error("Container element not found");

        this._value = options.value ?? 0;
        this._size = options.size || 200;
        this._strokeWidth = options.strokeWidth || 20;
        this._radius = this._size/2 - this._strokeWidth/2;
        this._backgroundColor = options.backgroundColor || "#eef3f6";
        this._progressColor = options.progressColor || "#005dff";
        this._circumference = 2 * Math.PI * this._radius;
        this._initialAnimated = options.animated || false;
        this._initialHidden = options.hidden || false;
        
        this._isAnimated = false;
        this._isHidden = false;

        this._animationFrames = [
            {transform: "rotate(-90deg)"},
            {transform: "rotate(270deg)"},
        ]
        this._animationTiming = {
            duration: 2000,
            iterations: Infinity,
        }
        this._currentAnimation = {};

        this._init();
    }

    _init(){
        this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        this._svg.setAttribute("viewBox", `0 0 ${this._size} ${this._size}`);
        this._svg.setAttribute("width", this._size);
        this._svg.setAttribute("height", this._size);
        this._svg.setAttribute("style", "transform: rotate(-90deg);");

        this._progressBarBackground = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this._progressBarBackground.setAttribute("r", this._radius);
        this._progressBarBackground.setAttribute("cx", this._size / 2);
        this._progressBarBackground.setAttribute("cy", this._size / 2);
        this._progressBarBackground.setAttribute("fill", "transparent");
        this._progressBarBackground.setAttribute("stroke", this._backgroundColor);
        this._progressBarBackground.setAttribute("stroke-width", this._strokeWidth);
        this._progressBarBackground.setAttribute("stroke-dasharray", this._circumference);

        this._progressBarProgress = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        this._progressBarProgress.setAttribute("r", this._radius);
        this._progressBarProgress.setAttribute("cx", this._size / 2);
        this._progressBarProgress.setAttribute("cy", this._size / 2);
        this._progressBarProgress.setAttribute("fill", "transparent");
        this._progressBarProgress.setAttribute("stroke", this._progressColor);
        this._progressBarProgress.setAttribute("stroke-width", this._strokeWidth);
        this._progressBarProgress.setAttribute("stroke-dasharray", this._circumference);
        
        this._updateValue();
        this.setAnimated(this._initialAnimated);
        this.setHidden(this._initialHidden);
        
        this._svg.appendChild(this._progressBarBackground);
        this._svg.appendChild(this._progressBarProgress);
        this.container.appendChild(this._svg);
    }
    _updateValue(){
        const clampedValue = Math.min(Math.max(this._value, 0), 100);
        const dashOffset = this._circumference * (1 - clampedValue / 100);
        this._progressBarProgress.setAttribute("stroke-dashoffset", dashOffset);
    }

    set value(newValue){
        this._value = newValue;
        this._updateValue();
    }
    get value(){
        return this._value;
    }

    setAnimated(animate){
        if (animate && !this._isAnimated){
            this._isAnimated = true;
            this._currentAnimation=this._svg.animate(this._animationFrames, this._animationTiming);
        }
        else if (!animate && this._isAnimated){
            this._isAnimated = false;
            this._currentAnimation.cancel();
        }
    }
    setHidden(hidden){
        if (hidden && !this._isHidden){
            this._isHidden = true;
            this.container.style.display = "none";
        }
        else if (!hidden && this._isHidden){
            this._isHidden = false;
            this.container.style.display = "block";
        }
    }
}