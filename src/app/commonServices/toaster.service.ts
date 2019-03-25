import { Injectable } from '@angular/core'
declare let toastr:any

@Injectable()

export class ToasterService {
    constructor() {
    this.toasterSetting();
    }
    success(message: string, title?: string) {
        toastr.success(message, title)
    }
    info(message: string, title?: string) {
        toastr.info(message, title)
    }
    warning(message: string, title?: string) {
        toastr.warning(message, title)
    }
    error(message: string, title?: string) {
        toastr.error(message, title)
    }

    toasterSetting(){
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-top-right",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "3000",
            "hideDuration": "1000",
            "timeOut": "5000",
            "extendedTimeOut": "1000",
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut"
          }
    }
}
