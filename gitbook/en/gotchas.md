# Common gotchas

## About localize with `data` option

The `data` opition of Vue Component evaluate once only when Vue Component is instantiated.

For this reason, if you localize with `$t`, `$n` and `$d` inside this option, cannot change it with `locale` of VueI18n instance (e.g. vm.$i18n.locale).

As a workaround, you can use the computed props.
