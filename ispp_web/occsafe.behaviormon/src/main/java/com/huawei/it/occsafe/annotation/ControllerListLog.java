/*
 * Copyright (c) Huawei Technologies Co., Ltd. 2012-2020. All rights reserved.
 */

package com.huawei.it.occsafe.annotation;

import com.huawei.it.occsafe.service.impl.bean.LogConstant;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * @author pWX814460
 * @description ControllerListLog
 * @since 2020/10/27 11:01
 */

@Target(ElementType.METHOD)
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ControllerListLog {
    /**
     * module
     *
     * @return module
     */
    String module() default "";

    /**
     * operateInfo
     *
     * @return operateInfo
     */
    String operateInfo() default "";

    /**
     * operateType
     *
     * @return operateType
     */
    String operateType() default "";

    /**
     * clazz
     *
     * @return clazz
     */
    Class clazz() default Object.class;

    /**
     * 日志类型
     *
     * @return 日志类型
     */
    String logType() default LogConstant.DEFAULT;

}

