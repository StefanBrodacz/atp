<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\Routing\Annotation\Route;

class SidebarController extends AbstractController
{
    /**
     * @Route("/default", name="default")
     */
    public function index()
    {
//        return $this->render('default/index.html.twig', [
//            'controller_name' => 'DefaultController',
//        ]);
        return $this->render('control-sidebar/settings.html.twig', []);
    }
}
