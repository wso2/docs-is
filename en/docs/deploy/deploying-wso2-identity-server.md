---
template: templates/single-column.html
---

<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />

<div>
    <header>
        <h1>Deploy WSO2 Identity Server</h1>
    </header>
    <div>
        <header>
        <h2>Setup new deployment</h2>
        </header>
    </div>
    <div>
        <div class="content"> 
            <!-- begin card -->
            <div class="card" onclick="location.href='../../deploy/choose-your-provider';">
	              <div class="line"></div>
         	      <div class="icon">
                      <i class="material-icons md-20">
                         <img src="../../assets/img/deploy/k8s.png">
                      </i>
	              </div>
                <div class="card-content">
              	    <p class="title">Kubernetes</p>
                    <p class="hint">Deploy WSO2 IS using Kubernetes</p>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card" onclick="location.href='../../deploy/aws';">
                <div class="line"></div>
                <div class="icon">
                      <i class="material-icons md-20">
                         <img src="../../assets/img/deploy/aws.png">
                      </i>
	              </div>
                <div class="card-content">
                    <p class="title">AWS</p>
                    <p class="hint">Deploy WSO2 IS using AWS resources</p>
                </div>
            </div>
            <!-- end card -->
        </div>
    </div>
        <div>
        <header>
        <h2> Manage existing deployment</h2>
        </header></div>
        <div class="content"> 
            <!-- begin card -->
            <div class="card" onclick="location.href='../../deploy/choose-your-provider';">
	              <div class="line"></div>
         	      <div class="icon">
                      <i class="material-icons md-20">
                         <img src="../../assets/img/deploy/upgrade.png">
                      </i>
	              </div>
                <div class="card-content">
              	    <p class="title">Upgrading</p>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card" onclick="location.href='../../deploy/aws';">
                <div class="line"></div>
                <div class="icon">
                      <i class="material-icons md-20">
                         <img src="../../assets/img/deploy/tuning.png">
                      </i>
	              </div>
                <div class="card-content">
                    <p class="title">Performance tuning</p>
                </div>
            </div>
            <!-- end card -->
            <!-- begin card -->
            <div class="card" onclick="location.href='../../deploy/aws';">
                <div class="line"></div>
                <div class="icon">
                      <i class="material-icons md-20">
                         <img src="../../assets/img/deploy/monitor.png">
                      </i>
	              </div>
                <div class="card-content">
                    <p class="title">Monitoring</p>
                </div>
            </div>
            <!-- end card -->
</div>  
