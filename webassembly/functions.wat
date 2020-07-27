(module
  ;; Modulo 10^9+7 multiplication
 (func $mulMod (export "mulMod") (param $a f64) (param $b f64) (result f64)
    get_local $a
    i64.trunc_f64_s
    i64.const 1000000007
    i64.rem_s
    get_local $b
    i64.trunc_f64_s
    i64.const 1000000007
    i64.rem_s
    i64.mul
    i64.const 1000000007
    i64.add 
    i64.const 1000000007
    i64.rem_s
    f64.convert_i64_s
 )
 ;; Binary modulo 10^9+7 exponentiation
 (func $expMod (export "expMod") (param $num f64) (param $pow f64) (result f64)
    (local $res i64) (local $a i64) (local $b i32)
    i64.const 1
    set_local $res
    ;;
    get_local $num
    i64.trunc_f64_u
    i64.const 1000000007
    i64.rem_u
    set_local $a
    ;;
    get_local $pow
    i64.trunc_f64_u
    i64.const 1000000007
    i64.rem_u
    i32.wrap_i64
    set_local $b
    ;;
    loop $L0
        get_local $b
        i32.const 1
        i32.and
        if
          get_local $res
          get_local $a
          i64.mul
          i64.const 1000000007
          i64.rem_u
          set_local $res
        end
        ;;
        get_local $a
        get_local $a
        i64.mul
        i64.const 1000000007
        i64.rem_u
        set_local $a
        ;;
        get_local $b
        i32.const 1
        i32.shr_u
        tee_local $b
        ;;
        br_if $L0
    end
    get_local $res
    f64.convert_i64_u
 )
 ;; Modulo 10^+7 division
 (func $divMod (export "divMod") (param $a f64) (param $b f64) (result f64)
  get_local $b
  f64.const  1000000005
  call $expMod
  get_local $a
  call $mulMod
 )
)
