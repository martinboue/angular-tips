---
sidebar_position: 1
---
# Component class

 - naming selector
        - prefix app-
- group components attributes (inject, input, output, constants, ...)
- use input, output and host signals instead of @Input, @Ouput and @Host decorators
- use model for input/ouput
- use inject instead of constructor
- avoid ngOnChanges
- avoid manipulating DOM
- never use ViewEncapsulation.None
- ChangeDetectionStrategy.Default vs ChangeDetectionStrategy.OnPush
    - Configurer pour mettre OnPush par défaut dans angular.json
- avoid as much as possible detectChanges, usually means it is bad code/architecture
- avoid as much as possible markForCheck, use signals instead
- subscritions
    - when and when not to unsubscribe
    - use async pipes
    - use takeUntilDestroyed instead of saving subscription and unsubscribe in ngOnDestroy
- rxjs ?
- use standalone, never NgModule
- component extending another component or directive
- implement lifecycle interface (OnInit, OnDestroy, ...) if you define its methods
- prefer template and CSS in a seperate file
    - exception : extremely short template (1-2 lines)
