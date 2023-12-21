import AOS from 'aos';
import 'aos/dist/aos.css';

export function initAOS (){
    AOS.init({
        duration : 1000,
        once: true
      });
}

export default initAOS