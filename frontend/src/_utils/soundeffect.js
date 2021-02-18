import purple_eureka from "../_assets/soundeffect/q_purple/eureka.wav";
import purple_hungry from "../_assets/soundeffect/q_purple/hungry.wav";
import purple_jmt from "../_assets/soundeffect/q_purple/jmt.wav";
import purple_nomat from "../_assets/soundeffect/q_purple/nomat.wav";
import purple_yumyum from "../_assets/soundeffect/q_purple/yumyum.wav";
import yellow_eureka from "../_assets/soundeffect/q_yellow/eureka.wav";
import yellow_hungry from "../_assets/soundeffect/q_yellow/hungry.wav";
import yellow_jmt from "../_assets/soundeffect/q_yellow/jmt.wav";
import yellow_nomat from "../_assets/soundeffect/q_yellow/nomat.wav";
import yellow_yumyum from "../_assets/soundeffect/q_yellow/yumyum.wav";
import pink_eureka from "../_assets/soundeffect/q_pink/eureka.wav";
import pink_hungry from "../_assets/soundeffect/q_pink/hungry.wav";
import pink_jmt from "../_assets/soundeffect/q_pink/jmt.wav";
import pink_nomat from "../_assets/soundeffect/q_pink/nomat.wav";
import pink_yumyum from "../_assets/soundeffect/q_pink/yumyum.wav";
import blue_eureka from "../_assets/soundeffect/q_blue/eureka.wav";
import blue_hungry from "../_assets/soundeffect/q_blue/hungry.wav";
import blue_jmt from "../_assets/soundeffect/q_blue/jmt.wav";
import blue_nomat from "../_assets/soundeffect/q_blue/nomat.wav";
import blue_yumyum from "../_assets/soundeffect/q_blue/yumyum.wav";
import brown_eureka from "../_assets/soundeffect/q_brown/eureka.wav";
import brown_hungry from "../_assets/soundeffect/q_brown/hungry.wav";
import brown_jmt from "../_assets/soundeffect/q_brown/jmt.wav";
import brown_nomat from "../_assets/soundeffect/q_brown/nomat.wav";
import brown_yumyum from "../_assets/soundeffect/q_brown/yumyum.wav";

// 길쿼카
const p_eureka = new Audio(purple_eureka);
const p_hungry = new Audio(purple_hungry);
const p_jmt = new Audio(purple_jmt);
const p_nomat = new Audio(purple_nomat);
const p_yumyum = new Audio(purple_yumyum);

// 숨쿼카
const pi_eureka = new Audio(pink_eureka);
const pi_hungry = new Audio(pink_hungry);
const pi_jmt = new Audio(pink_jmt);
const pi_nomat = new Audio(pink_nomat);
const pi_yumyum = new Audio(pink_yumyum);

// 재쿼카
const y_eureka = new Audio(yellow_eureka);
const y_hungry = new Audio(yellow_hungry);
const y_jmt = new Audio(yellow_jmt);
const y_nomat = new Audio(yellow_nomat);
const y_yumyum = new Audio(yellow_yumyum);

// 쭌쿼카
const b_eureka = new Audio(blue_eureka);
const b_hungry = new Audio(blue_hungry);
const b_jmt = new Audio(blue_jmt);
const b_nomat = new Audio(blue_nomat);
const b_yumyum = new Audio(blue_yumyum);

// 염쿼카
const br_eureka = new Audio(brown_eureka);
const br_hungry = new Audio(brown_hungry);
const br_jmt = new Audio(brown_jmt);
const br_nomat = new Audio(brown_nomat);
const br_yumyum = new Audio(brown_yumyum);

export const sound_yumyum = {
  0: br_yumyum,
  1: y_yumyum,
  2: pi_yumyum,
  3: b_yumyum,
  4: p_yumyum
}

export const quokka_sound = {
  0 : {
    "유레카!": br_eureka,
    "배고팡!": br_hungry,
    "JMT!": br_jmt,
    "맛없엉!": br_nomat,
  },
  1 : {
    "유레카!": y_eureka,
    "배고팡!": y_hungry,
    "JMT!": y_jmt,
    "맛없엉!": y_nomat,
  },
  2 : {
    "유레카!": pi_eureka,
    "배고팡!": pi_hungry,
    "JMT!": pi_jmt,
    "맛없엉!": pi_nomat,
  },
  3 : {
    "유레카!": b_eureka,
    "배고팡!": b_hungry,
    "JMT!": b_jmt,
    "맛없엉!": b_nomat,
  },
  4 : {
    "유레카!": p_eureka,
    "배고팡!": p_hungry,
    "JMT!": p_jmt,
    "맛없엉!": p_nomat,
  }
}