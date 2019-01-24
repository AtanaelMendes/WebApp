import AgroUtils from 'assets/js/AgroUtils'

export default {
  data(){
    return {
      form: Object,
      formCloned: Object,
      routeName: String
    }
  },
  methods: {
    setFormObj: function (formObj) {
      this.formCloned = JSON.parse(JSON.stringify(formObj));
    }
  },
  beforeRouteLeave (to, from, next) {
    if(from.name === this.routeName) {
      if (!AgroUtils.compare(this.formCloned, this.form)) {
        this.$q.dialog({
          title: 'Atenção',
          message: 'Se sair você perderá todas as alterações. Deseja continuar?',
          ok: 'Sim',
          cancel: 'Cancelar',
          preventClose: true,
          color: 'primary'
        }).then(data => {
          next();
        }).catch(() => {
          // Picked "Cancel" or dismissed
        });
        return;
      }
    }
    next()
  },
}
