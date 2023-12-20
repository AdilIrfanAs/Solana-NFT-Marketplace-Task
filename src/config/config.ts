import Swal from 'sweetalert2';
export const config = {
    TOAST_TIMMER:3000,
    nftSaleAccountPublicKey:"27xvMrDKHZNEpk5SvTACFfSDfCTHLmM5mvv9ozHPff9E"
};

export const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: config.TOAST_TIMMER,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });