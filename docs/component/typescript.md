---
sidebar_position: 1
draft: true
---
# Component class

- subscritions
    - when and when not to unsubscribe
    - use async pipes
    - use takeUntilDestroyed instead of saving subscription and unsubscribe in ngOnDestroy
- rxjs ?
- use standalone, never NgModule
- component extending another component or directive

## General 

 - naming selector
        - prefix app-
- prefer template and CSS in a seperate file
    - exception : extremely short template (1-2 lines)
- group components attributes (inject, input, output, constants, ...)
- use inject instead of constructor
- avoid manipulating DOM

## Inputs & outputs
- use input, output and host signals instead of @Input, @Ouput and @Host decorators
- use model for input/ouput

## Change detection
- ChangeDetectionStrategy.Default vs ChangeDetectionStrategy.OnPush
    - Configurer pour mettre OnPush par défaut dans angular.json
- avoid as much as possible detectChanges, usually means it is bad code/architecture
- avoid as much as possible markForCheck, use signals instead

## Lifecycle 

- implement lifecycle interface (OnInit, OnDestroy, ...) if you define its methods
- avoid ngOnChanges, use input signals instead