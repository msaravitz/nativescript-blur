import * as application from 'tns-core-modules/application';
import * as frame from "tns-core-modules/ui/frame";
import * as utilsModule from "tns-core-modules/utils/utils";


declare var com: any;

var BlurKit = com.wonderkiln.blurkit.BlurKit;

export class Blur {
    constructor(dimOnAndroid?) {
        if (dimOnAndroid) this.dimOnAndroid = true;
    }

    private nsViewMap: any = {};
    private android: any;
    private instance;
    private dimOnAndroid: boolean = false;
    public on(nsView, viewName, theme?, duration?) {
        if (!theme) theme == 'dark';
        if (duration) {
            duration = duration*1000; //convert to ms.
        } else {
            duration = 300;
        }
        return new Promise((resolve, reject) => {
            if (this.dimOnAndroid) {
                if (!this.nsViewMap[viewName]) {
                    this.nsViewMap[viewName] = nsView;
                    nsView.opacity = 0;
                    nsView.backgroundColor = 'rgba(0,0,0,0.7)';
                    if (theme == 'light') nsView.backgroundColor = 'rgba(255,255,255,0.7)';
                    nsView.animate({
                        opacity: 1,
                        duration: duration
                    }).then(() => {
                        resolve();
                    })
                }
            }
        })
    }

    public off(viewName, duration?) {
        return new Promise((resolve, reject) => {
            if (this.dimOnAndroid) {
                if (duration) {
                    duration = duration*1000; //convert to ms.
                } else {
                    duration = 300;
                }
                if (this.nsViewMap[viewName]) {
                    this.nsViewMap[viewName].animate({
                        opacity: 0,
                        duration: duration
                    }).then(() => {
                        this.nsViewMap[viewName].backgroundColor = 'transparent';
                        this.nsViewMap[viewName].opacity = 1;
                        delete this.nsViewMap[viewName];
                        resolve();
                    })
                }
                
            }
            resolve();
        })   
    }
}
