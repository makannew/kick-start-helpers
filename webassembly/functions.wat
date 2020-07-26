(module
 (func $add (export "add") (param f64) (param f64) (result f64)
   get_local 0
   get_local 1
   f64.add
  )

 (func $mulMod (export "mulMod") (param $a f64) (param $b f64) (result f64)
    get_local $a
    i64.trunc_f64_s
    i64.const 1000000007
    i64.rem_u
    get_local $b
    i64.trunc_f64_s
    i64.const 1000000007
    i64.rem_u
    i64.mul
    i64.const 1000000007
    i64.add 
    i64.const 1000000007
    i64.rem_u
    f64.convert_i64_s
 )
)
